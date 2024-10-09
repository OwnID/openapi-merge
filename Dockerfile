FROM node:22-alpine

WORKDIR /app
COPY . .
RUN yarn add bolt &&  \
    yarn bolt install && \
    cd packages/openapi-merge && yarn build && cd ../.. && \
    cd packages/openapi-merge-cli && yarn build && cd ../.. && \
    chmod +x packages/openapi-merge-cli/dist/cli.js

ENTRYPOINT "/app/packages/openapi-merge-cli/dist/cli.js"
