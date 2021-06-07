FROM node:12.16.0

ENV PORT 8080

ARG ENV_BACKEND_URI=$NEXT_PUBLIC_APP_API_URL

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY . /usr/src/app/
RUN yarn

# Copying source files
# COPY . /usr/src/app

# Building app
RUN yarn build
EXPOSE 8080

# Running the app
CMD "yarn" "start"