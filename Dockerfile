FROM node:lts-alpine

RUN mkdir -p /app/.output && chown -R 1000 /app
USER 1000
WORKDIR /app
COPY .output /app/.output

CMD [ "node", ".output/server/index.mjs" ]
