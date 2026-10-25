# Recipe for the app's container image. Docker runs it top to bottom.
# Note: in a Dockerfile, comments must be on their own line. A # after an instruction is NOT a comment.

# Start from an existing base image: Node.js 24 on Alpine, a very small Linux.
# "AS runtime" names this build stage (only needed if the file ever gets several stages).
FROM node:24-alpine AS runtime

# Working directory inside the image; following commands run here. Created if missing.
WORKDIR /app

# Environment variables the running app can read (process.env.NODE_ENV, process.env.PORT).
# NODE_ENV=production tells Node.js libraries this isn't development.
ENV NODE_ENV=production
# The port the app listens on (read in src/server.mjs).
ENV PORT=8080

# Copy files from the repo into the image's working directory (./ = /app).
COPY package.json ./
COPY src ./src

# Build argument: a value passed while building, e.g. --build-arg APP_VERSION=0.2.1. "dev" if none is passed.
ARG APP_VERSION=dev
# Keep it as an environment variable, so the running app can show it on / and /health.
ENV APP_VERSION=${APP_VERSION}

# Run as the unprivileged user "node" instead of root: a compromised app can do less damage.
USER node
# Documents that the app listens on 8080. Doesn't open or publish anything by itself.
EXPOSE 8080

# The command that runs when a container starts: node src/server.mjs
CMD ["node", "src/server.mjs"]
