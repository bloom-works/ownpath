# **************************************
# Stores the Terraform state centrally in AWS,
# such that `../infra/aws_infra.tf` can be run from
# any computer or CI job consistently.
#
# File contains:
# - Variables
# - Providers
# - Storage
# - Lock
# **************************************

# --------------------------------------
# Variables
#
# Specify as environment variables as `export TF_VAR_<var name>="<value>"`
# --------------------------------------
variable "bucket_name" {
  type          = string
  description   = "The name of the storage bucket that will eventually be used for the site. '-terraform-state' appended to resources in here."
  default       = ""
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
}

provider "aws" {
    region = "us-east-1"
}

# --------------------------------------
# Storage: Stores Terraform state file centrally
# --------------------------------------
resource "aws_s3_bucket" "storage" {
    bucket = format("%s%s", var.bucket_name, "-terraform-state")
    force_destroy = true
}

resource "aws_s3_bucket_versioning" "storage" {
    bucket = aws_s3_bucket.storage.bucket
    versioning_configuration {
        status = "Enabled"
    }
}

# --------------------------------------
# Lock: Creates a record in Dynamo DB that says if another user is running Terraform or not
# --------------------------------------
resource "aws_dynamodb_table" "lock" {
    name           = format("%s%s", var.bucket_name, "-terraform-state")
    read_capacity  = 5
    write_capacity = 5
    hash_key       = "LockID"

    attribute {
        name = "LockID"
        type = "S"
    }

    ttl {
        attribute_name = "TimeToExist"
        enabled        = false
    }
}