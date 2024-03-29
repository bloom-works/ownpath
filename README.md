# OwnPath: A Colorado Care Directory by the Behavioral Health Administration

OwnPath is an accessible, searchable online directory of behavioral and mental
health care providers and services operating on Colorado. More information about
the site can be found in this press release:
https://bha.colorado.gov/blog-post/ownpath-launches-in-colorado

## Accessibility

This application leverages libraries and frameworks that are built with
accessibility in mind. By leveraging [USWDS](https://designsystem.digital.gov/)
and [react-boostrap](https://react-bootstrap.netlify.app/#rb-docs-content),
development starts from a foundation of accessibility by default.

Automated [aXe tests](https://github.com/dequelabs/axe-core) run on every change
to the application to check for adherence to WCAG guidelines and other best
practices. However, automated testing will only catch a percentage of
accessibility and usibility problems. To this end, we attempt to test new
features and interactions with assistive technologies such as screen readers.
Additionally, we have conducted research and testing with folks who are regular
users of assistive technologies, to attempt to understand where real pain points
exist. Ideally, continued research and testing with disabled users will be a
regular part of the application development cycle.

Specifically, we have taken these steps to make the app accessible to all users:

- Human translation and localization of the entire application into Spanish,
  with more languages to come.
- Meaningful labels/titles/descriptions of all elements are present in the DOM
  for screen readers, even when they are not visible.
- Logical ordering and grouping of content, with appropriate heading levels
  throughout.
- Correct use of button and anchor elements based on functionality.
- Visual-only elements (e.g. maps and map markers) are hidden from screen
  readers.

## Dev Setup (docker)

This setups up a dev environment within a container to reduce "it works on my
machine" problems and to create a clean, consistent environment (but adds some
complexity compared to the non-container setup below). Optionally, it pairs
really well with
[VSCode's Remote Container extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).

### Prerequisites

- [Docker for Desktop](https://www.docker.com/products/docker-desktop/)

### Steps

Run these instructions whenever you change the `Dockerfile` or want to reset
your environment.

1. Clone this repo
1. Navigate into its base directory
1. Run:
   - `docker build -t coloradodigitalservice/co-care-directory .`
1. Then, you can jump into the container's command line:
   - `docker run -p 3000:3000 -it -v $PWD:/app --rm coloradodigitalservice/co-care-directory bash`
   - Note: `$PWD` as the full path to the base directory. Change if you need
     something different.
1. Download dependencies:
   - `npm install`
   - Run whenever your `package.json` changes
1. Start the debug server:
   - `npm start`
1. Access the app at `http://localhost:3000`

## Dev Setup (non-container)

This is a simple, non-containerized setup, but might be impacted by other things
installed on your machine (i.e. other devs might experience things differently
than you).

### Prerequisites

Install these items first:

- [Node.js](https://nodejs.org/en/download/) at version 16.11.x LTS

### Steps

1. Clone this repo
1. Navigate into its base directory
1. Download dependencies:
   - `npm install`
   - Run whenever your `package.json` changes
1. Start the debug server:
   - `npm start`
1. Access the app at `http://localhost:3000`

## Data

OwnPath serves data from a flat CSV file that is located in this repository in
the `raw_data` folder. Currently, this data is pulled from a single BHA data
source, LADDERS. In the future, the application data may be updated to include
multiple sources.

### Data Updates

The process to update the data served in OwnPath, the CSV file in this
repository must be updated. Currently, the process for this is comprised of
manual steps:

1. [data owner with LADDERS access] runs process to create an updated export of
   LADDERS data in the format expected by OwnPath.
1. [github contributor] creates Pull Request in the OwnPath repository with the
   updated data file.
1. [code owner or product owner] reviews the Pull Request by confirming:
   - search results in associated review environment appear correctly
     (suggestion: spot check by comparing a search in review environment with
     production site)
   - data structure has not been changed unexpectedly (e.g. new columns added to
     export, new value added to list field)
1. If a breaking change has been made to the data export (a change that requires
   updates to the application code or data processing script (see below) to
   maintain application functionality), those changes can be addressed in a
   commit added to the data update Pull Request. Once any necessary changes are
   made, or data spot check is complete, [code owner or product owner] approves
   the Pull Request
1. [github contributor, code owner, or product owner] merged approved Pull
   Request, and updated data is automatically deployed to the production site.

Because data extract creation, Pull Request creation, Pull Request review, and
Pull Request merge are all manual steps, this process is highly manual. As a
result we have set an SLA of maximum 8 days for data updates from LADDERS to
appear in OwnPath. This allows for weekends and holidays, and any other
unforseen delays that may occur.

### Processing Data

We use a standalone script to transform a CSV export into a cleaned JSON file.
To process data, run:

```
npm run processdata
```

This happens automatically as part of `npm run build` and `npm run start`, so
you don't typically have to run this unless you're debugging the data
transformation itself.

## Generating translations JSON

Translations are maintained in a
[google sheet](https://docs.google.com/spreadsheets/d/1-BrtUlIZb8otb8Ant6CMovvqUGFCkhcjwXkP-NbzQkE/edit#gid=1026945337),
which is transformed into JSON for the application to use by a standalone
script. To generate updated translations JSON, download the sheet to your local
machine and run:

```
npm run generatetranslations [path to file]
```

The download of the google sheet needs to be an `xlsx` file since there are
several tabs contained in the translation doc.

This process must be run manually whenever content changes or updates are made
in the google doc. The changes then need to be committed to the repo and merged
to be reflected in the application. Any rows missing translations will be
printed to the console where the script is run to help avoid accidentally adding
un-translated content.

## Search Filters

For more information on the search filters implemented in the application, see
[this google doc]
(https://docs.google.com/document/d/1yEdo7IpHCtEKNNF6FMLapBUgcPw_8CY7wGwxKTdtJrU/edit)

## Analytics

For more information on GA analytics and events tracked by the tool, see
[this google doc](https://docs.google.com/document/d/1DfQDUNZPO3B352EhUwXp0el6qrAWz8Jq9cTa1yv8Ty4/edit#heading=h.u1gpfvxcg1x3)

## Using SVGs

Using SVGs in React apps is super easy. To make them fully component prop/CSS
customizable ensure you do these things:

1. Only set width or height (not both) on the main SVG element. This allows you
   to scale the size of the SVG by setting width/height prop on the component.
1. set "fill" prop on <svg> element to be "currentColor". This allows you to
   color the SVG with CSS "color" property.
1. DON'T set "fill" prop on any inner elements within the <svg>. This will
   prohibit you from dynamically setting the color with CSS "color" property.

## Heroku Review App Environment Setup

1. Create a pipeline
1. Connect to GitHub
1. Enable Review Apps, choosing these options:
   - Automatically create review apps for new PRs

## Heroku App Environment Setup

Good for ondemand environments in Heroku running in debug mode.

To do this, first install and login to
[the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

1. Create a new app
1. From the app's settings, go to the `Deploy` tab
1. Go to either `Automatic deploys` or `Manual deploys` and choose the branch
   you'd like deployed and trigger a deployment.
1. The deployment will initially fail because it doesn't understand that it is a
   container-based app. Issue this command from the Heroku CLI:
   - `heroku stack:set container -a (app name)`
1. Trigger another deployment

## AWS Deployment

### First time

The first time you ever deploy the site to an AWS Account from _any_ computer,
run this. In other words, if an AWS Account has already been setup to store
Terraform state centrally, you shouldn't run this (i.e. only for full Account
recovery after a catastrohpic problem or for setting up a new dev AWS Account)

1. Setup a new AWS Account or login to an existing one that you have admin
   rights on
1. [Create a user](https://us-east-1.console.aws.amazon.com/iamv2/home#/users)
   1. User name: `terraform`
   1. Select AWS credential type:
      - ✅ Access key
   1. Next
   1. Attach existing policies directly
      - ✅ AdministratorAccess (TODO: This grants anything. Remove this and
        specify only what's needed)
   1. Set permission boundary: Create user without a permissions boundary (TODO
      Reduce this)
   1. Next
   1. Next
   1. Create user
   1. Copy the user ID, access key ID, and secret access key
   1. Close

Next, we need to create storage for the Terraform state.

1. Build the dev/deploy tools Docker container:
   `docker build -t coloradodigitalservice/co-care-directory-deploy -f Dockerfile.Deploy .`
1. Launch a terminal in the dev container from the root of the code base:
   `docker run -it -v $PWD:/app --rm coloradodigitalservice/co-care-directory-deploy bash`
   (TODO: Remove directory mapping after state is stored centrally)
1. Navigate to: `cd infra/aws/state`
1. Set `export TF_VAR_bucket_name="<S3 bucket name>"` with a
   [valid name](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html)
   of the S3 bucket where built app files will be stored. This must be unique
   across all of AWS.
1. Set `export AWS_ACCESS_KEY_ID="<your AWS user's access key ID>"`
1. Set `export AWS_SECRET_ACCESS_KEY="<your AWS secret access key>"`
1. Setup Terraform: `terraform init`
1. Build the infrastructure: `terraform apply` and then type `yes`
1. Save a backup of the `terraform.state` file
   - This is a state file containing only the S3 storage for the deployment's
     state file and Dynamo DB table that locks Terraform runs to one user at a
     time. There is no central backup, so put it somewhere safe even though
     you'll probably never need it again.
   - If you _do_ lose this state file, you can manually modify/remove the S3
     bucket and DynamoDB table both named
     `${TF_VAR_bucket_name}-terraform-state`

### Manual deployment

These steps might need to be run if an automatic deployment fails, a prior state
of the application needs to be restored, or if you're setting up a dev AWS
Account. These assume that the First Time instructions have been run on the AWS
Account from _any_ computer _onece_ before this (i.e. most likely has been).

1. Clone the repo and set to the tag or branch you want to deploy.
1. Build the dev/deploy tools Docker container:
   `docker build -t coloradodigitalservice/co-care-directory-deploy -f Dockerfile.Deploy .`
1. Launch a terminal in the dev container from the root of the code base:
   `docker run -it --rm coloradodigitalservice/co-care-directory-deploy bash`
1. Set `export TF_VAR_bucket_name="<S3 bucket name>"` with a
   [valid name](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html)
   of the S3 bucket where built app files will be stored. This must be unique
   across all of AWS.
1. (optional) Set `export TF_VAR_domains='["domain1.com","domain2.org"]'` with
   the domains, with primary domain first
   - If no domains specified, it'll just use a CloudFront generated domain
   - The order of the domains needs to be the same _every_ time
1. Set `export AWS_ACCESS_KEY_ID="<your AWS user's access key ID>"`
1. Set `export AWS_SECRET_ACCESS_KEY="<your AWS secret access key>"`
1. Run the deployment `sh ci/publish_build.sh`
