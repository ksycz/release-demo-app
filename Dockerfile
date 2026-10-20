FROM node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package.json ./
COPY src ./src

ARG APP_VERSION=dev
ENV APP_VERSION=${APP_VERSION}

USER node
EXPOSE 8080

CMD ["node", "src/server.mjs"]
