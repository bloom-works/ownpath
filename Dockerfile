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