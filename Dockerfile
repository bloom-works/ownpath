################################
# Dockerfile provided for local development, preview environments, and build/deployment tools. Not for running in prod.
#
# To build: 
#    docker build -t coloradodigitalservice/co-care-directory .
#
# To run in debug mode:
#   (1) docker run -p 3000:3000 -it --rm coloradodigitalservice/co-care-directory
#   (2) Go to https://localhost:3000 in your browser
#
# To run dev environment (on port 3000), with directory mapped (i.e. so you can make changes to files):  
#   (1) docker run -p 3000:3000 -it --rm coloradodigitalservice/co-care-directory sh
#   (2) npm start
#   (2) Go to https://localhost:3000 in your browser
#
################################
FROM node:16.11

################################
# CONFIGURE AT BUILD TIME:
#   Example: `docker build --build-arg APP_VERSION=(version) (...)`

# Version or branch name that that the container will be labeled with
ARG ENV_APP_VERSION="not set"
ENV APP_VERSION=${ENV_APP_VERSION}

# GitHub SHA that this was built from
ARG ENV_APP_COMMIT="SHA not set"
ENV APP_COMMIT=${ENV_APP_COMMIT}

################################

# -- Install build/deployment tools --

# Install Terraform  -- https://learn.hashicorp.com/tutorials/terraform/install-cli
RUN mkdir /tmp/terraform
WORKDIR /tmp/terraform
RUN apt-get update && apt-get install -y gnupg software-properties-common curl
RUN curl -fsSL https://apt.releases.hashicorp.com/gpg | apt-key add -
RUN apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
RUN apt-get update && apt-get install -y terraform=1.2.3
WORKDIR /

# Install AWS CLI -- https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
RUN mkdir /tmp/aws_setup
WORKDIR /tmp/aws_setup
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install
WORKDIR /
RUN rm -rf /tmp/_setup

# -- Install App --

# Copy the app code and make that dir the working directory
COPY . /app/.
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Expose the debug port
EXPOSE 3000

# Install dependencies
RUN npm install

# Start app
CMD ["npm", "start"]