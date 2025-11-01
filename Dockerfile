# =========================
# 1) BUILD
# =========================
FROM node:20.19.0-slim AS build
WORKDIR /app

# npm do fly tá velho -> atualiza pra 11.x que já resolve o bug do oxc
RUN npm install -g npm@11.6.2

# deps de build mínimas
RUN apt-get update -qq && apt-get install --no-install-recommends -y \
  build-essential python-is-python3 pkg-config \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

# instala usando o npm novo
RUN npm ci

# copia o resto
COPY . .

# build do nuxt
RUN npm run build

# =========================
# 2) RUNTIME
# =========================
FROM node:20.19.0-slim
WORKDIR /app

COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./

ENV NITRO_PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
