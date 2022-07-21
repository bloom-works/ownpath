# ARGS
# $1: Version tag (i.e. "1.0.0")

# Fail if any command exits with a non-zero exit code
set -e 

# Variables
APP_DIR="/app"
INFRA_DIR="$APP_DIR/infra/aws/infra"

# Checkout the new tag
cd $APP_DIR
git checkout $1

# Initialize Terraform
cd $INFRA_DIR
terraform init -backend-config="bucket=${TF_VAR_bucket_name}-terraform-state" -backend-config="dynamodb_table=${TF_VAR_bucket_name}-terraform-state"

# Apply the infrastructure
cd $INFRA_DIR
terraform apply -auto-approve

# Build the application
cd $APP_DIR
npm install
npm run build

# Deploy the application
cd $APP_DIR
aws s3 sync build/. s3://$TF_VAR_bucket_name --delete
