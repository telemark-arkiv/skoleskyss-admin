# Setting the base to nodejs 8.9.3
FROM node:8.9.3-alpine@sha256:40201c973cf40708f06205b22067f952dd46a29cecb7a74b873ce303ad0d11a5

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Expose 8000
EXPOSE 8000

# Startup
ENTRYPOINT npm start
