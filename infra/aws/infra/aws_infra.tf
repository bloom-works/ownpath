# **************************************
# Deploys app to AWS using Terraform
#
# See `/README.md` for instructions. Requires `../state/aws_state.tf` to be run first
#
# File contains:
# - Variables
# - Providers
# - Storage
# - Content Delivery Network (CDN)
# - Domain/URL
# - Outputs
# **************************************

# --------------------------------------
# Variables
#
# Specify as environment variables as `export TF_VAR_<var name>="<value>"`
# --------------------------------------
variable "bucket_name" {
  type          = string
  description   = "The name of the storage bucket."
  default       = ""
}

variable "domains" {
    type = list(string)
    description = "The URLs to have routing setup for. Primary domain should be first, with forwarding domains following."
    default = []
}

# --------------------------------------
# Providers: Setup AWS provider
# --------------------------------------
terraform {
    required_providers {
        aws = {
            source  = "hashicorp/aws"
            version = "4.20.1"
        }
    }

    # terraform init -backend-config="bucket=${TF_VAR_bucket_name}-terraform-state" -backend-config="dynamodb_table=${TF_VAR_bucket_name}-terraform-state"
    backend "s3" {
        key = "terraform.tfstate"      
        region = "us-east-1"
    }
}

provider "aws" {
    region = "us-east-1"
}

# --------------------------------------
# Storage: S3 bucket configuration 
# --------------------------------------
resource "aws_s3_bucket" "storage" {
    bucket = var.bucket_name
    force_destroy = true
}

resource "aws_s3_bucket_acl" "storage_acl" {
    bucket = aws_s3_bucket.storage.bucket

    # TODO This might be able to be `private` when CloudFront is up
    acl = "public-read"
}

resource "aws_s3_bucket_policy" "storage_policy" {
    bucket = aws_s3_bucket.storage.bucket
    policy = data.aws_iam_policy_document.storage_policy.json
}

data "aws_iam_policy_document" "storage_policy" {
    statement {
        sid = "PublicRead"
        effect = "Allow"

        principals {
            type = "AWS"
            identifiers = [ "*" ]
        }

        actions = [
            "s3:GetObject",
            "s3:GetObjectVersion"
        ]

        resources = [
            "${aws_s3_bucket.storage.arn}/*"
        ]
    }
}

resource "aws_s3_bucket_website_configuration" "storage_website" {
    bucket = aws_s3_bucket.storage.bucket
    index_document {
        suffix = "index.html"
    }
    error_document {
        key = "error.html"
    }
}

# --------------------------------------
# CDN (Content Delivery Network): CloudFront distribution
# --------------------------------------

locals {
    s3_origin_id = "S3-${var.bucket_name}"
}

# TODO If we want to make the S3 bucket private, then we can use this
# https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html
# resource "aws_cloudfront_origin_access_identity" "oai" {
#     comment = "my-react-app OAI"
# }

resource "aws_cloudfront_distribution" "cdn" {
    origin {
        domain_name = aws_s3_bucket.storage.bucket_regional_domain_name
        origin_id   = local.s3_origin_id

        # TODO If we want to make the S3 bucket private, then we can use this
        # s3_origin_config {
        #     origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
        # }
    }

    enabled         = true
    is_ipv6_enabled = true

    default_root_object = "index.html"

    aliases = var.domains

    default_cache_behavior {
        allowed_methods  = ["GET", "HEAD", "OPTIONS"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = local.s3_origin_id

        forwarded_values {
            query_string = true
            headers = [ "Origin" ]

            cookies {
                forward = "none"
            }
        }

        min_ttl                = 0
        default_ttl            = 3600
        max_ttl                = 86400
        compress               = true
        viewer_protocol_policy = "redirect-to-https"
        
    }

    ordered_cache_behavior {
        path_pattern     = "/index.html"
        allowed_methods  = ["GET", "HEAD", "OPTIONS"]
        cached_methods   = ["GET", "HEAD", "OPTIONS"]
        target_origin_id = local.s3_origin_id

        forwarded_values {
            query_string = true
            headers = [ "Origin" ]

            cookies {
                forward = "none"
            }
        }

        min_ttl                = 0
        default_ttl            = 0
        max_ttl                = 0
        compress               = true
        viewer_protocol_policy = "redirect-to-https"

    }

    # For North America and Europe only, which is the lowest price class
    # Georestrictions setting later one means only North America or US-based traffic, per CO request
    price_class = "PriceClass_100"

    # viewer_certificate {
    #     # Use CloudFront cert if no domains, use ACM one if there are domains
    #     cloudfront_default_certificate = length(var.domains) > 0 ? true : false
    #     acm_certificate_arn = length(var.domains) > 0 ? aws_acm_certificate_validation.certificate_validation[0].certificate_arn : null

    #     ssl_support_method  = "sni-only"
    # }

    # If there are domains, use the ACM certs
    dynamic "viewer_certificate" {
        for_each = length(var.domains) > 0 ? [1] : []
        content {
            acm_certificate_arn = aws_acm_certificate_validation.certificate_validation[0].certificate_arn
            ssl_support_method  = "sni-only"        
        }
    }
    # If no domains, use CloudFront's cert
    dynamic "viewer_certificate" {
        for_each = length(var.domains) > 0 ? [] : [1]
        content { cloudfront_default_certificate = true }
    }

    custom_error_response {
        error_caching_min_ttl = 300
        error_code            = 403
        response_code         = 200
        response_page_path    = "/index.html"
    }

    custom_error_response {
        error_caching_min_ttl = 300
        error_code            = 404
        response_code         = 200
        response_page_path    = "/index.html"
    }

    restrictions {
        geo_restriction {
            restriction_type = "whitelist"
            # Restricted per CO's request - See https://www.iso.org/obp/ui/#search for codes
            locations = [ 
                "US", # United States
                "UM", # US Minor Outlying Islands
                "PR", # Puerto Rico
                "GU", # Guam
                "VI", # US Virgin Islands
                "CA", # Canada
                "MX"  # Mexico
            ]
        }
    }
}

# --------------------------------------
# Domain/URL: Route53 domains and hosted zones
# --------------------------------------
# This defines the name servers and DNS records that the domain will point to
resource "aws_route53_zone" "hosted_zones" {
    count = length(var.domains)
    name = var.domains[count.index]
}

# Change the domain itself to point to the hosted zone name servers
resource "aws_route53domains_registered_domain" "domains" {
    count = length(aws_route53_zone.hosted_zones)
    domain_name = aws_route53_zone.hosted_zones[count.index].name
    
    # There doesn't seem to be a way to loop this or pass a list, but there seems to always be 4 name servers in an AWS hosted zone
    name_server {
        name = aws_route53_zone.hosted_zones[count.index].name_servers[0]
    }
    name_server {
        name = aws_route53_zone.hosted_zones[count.index].name_servers[1]
    }
    name_server {
        name = aws_route53_zone.hosted_zones[count.index].name_servers[2]
    }
    name_server {
        name = aws_route53_zone.hosted_zones[count.index].name_servers[3]
    }
}

# Direct the domains to the CloudFront CDN
resource "aws_route53_record" "domain_a_records" {
    count = length(aws_route53_zone.hosted_zones)
    name = aws_route53_zone.hosted_zones[count.index].name
    type = "A"
    zone_id = aws_route53_zone.hosted_zones[count.index].zone_id

    alias {
        name = aws_cloudfront_distribution.cdn.domain_name
        zone_id = aws_cloudfront_distribution.cdn.hosted_zone_id
        evaluate_target_health = false
    }
}

# Create a certificate for the main domain, but allow other domains to be valid per the cert as aliases
# To allow for not being created if there are no domains, it uses a count for conditional creation ...
#       This will only ever produce a 0 or 1 element list, so when it is created it should be accessed via element `[0]`
resource "aws_acm_certificate" "certificate" {
    count = length(var.domains) > 0 ? 1 : 0 # TODO Do this only for environments with domains  
    domain_name = var.domains[0]
    validation_method = "DNS"

    # alias domains
    subject_alternative_names = slice(var.domains, 1, length(var.domains)) # get the forwarding domains

    lifecycle {
        create_before_destroy = true # Make a new certificate before deleting any matching ones that already exist
    }
}

# This creates the CNAME record that the certificate will use to validate itself for each domain
locals {
    # Enables grabbing a Zone ID by domain name, needed for `domain_validation_options` and looking up zone IDs
    # KEY -> domain name
    # VALUE -> zone ID
    zone_ids_by_domain = { for zone in aws_route53_zone.hosted_zones : zone.name => zone.zone_id } 

    # Validation options, which are empty if no domains in environment
    domain_validation_options = length(var.domains) == 0 ? {} : { 
        for dvo in aws_acm_certificate.certificate[0].domain_validation_options : dvo.domain_name => {
            name    = dvo.resource_record_name
            record  = dvo.resource_record_value
            type    = dvo.resource_record_type
            zone_id = local.zone_ids_by_domain[dvo.domain_name]
        }
    }
}

# Set CNAME records on the DNS hosted zones
resource "aws_route53_record" "record_validations" {
    for_each = local.domain_validation_options

    allow_overwrite = true
    name            = each.value.name
    records         = [each.value.record]
    ttl             = 60
    type            = each.value.type
    zone_id         = each.value.zone_id
}

# This basically is a watcher to see when the certificate is finished being created and validated. It enables the CloudFront CDN resource to wait to be created until it has the certificate it'll use.
# To allow for not being created if there are no domains, it uses a count for conditional creation ...
#       This will only ever produce a 0 or 1 element list, so when it is created it should be accessed via element `[0]`
resource "aws_acm_certificate_validation" "certificate_validation" {
    count = length(var.domains) > 0 ? 1 : 0 # TODO Do this only for environments with domains 
    certificate_arn = aws_acm_certificate.certificate[0].arn
    validation_record_fqdns = [for record in aws_route53_record.record_validations : record.fqdn]
  
}

# --------------------------------------
# Output: Things to print out when finished executing
# --------------------------------------

output "urls" {
    description = "URL(s) that the app can be accessed at"
    value = length(var.domains) > 0 ? formatlist("https://%s", var.domains) : [aws_cloudfront_distribution.cdn.domain_name]
}