FROM node:20-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

ENV NITRO_PORT=${PORT}
ENV PORT=8080
ENV HOST=0.0.0.0

EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]
