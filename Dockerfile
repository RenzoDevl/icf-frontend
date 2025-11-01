# =========================
# 1) BUILD
# =========================
FROM node:20.19.0-slim AS build
WORKDIR /app

RUN npm install -g npm@11.6.2
RUN apt-get update -qq && apt-get install --no-install-recommends -y \
  build-essential python-is-python3 pkg-config \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# =========================
# 2) RUNTIME
# =========================
FROM node:20.19.0-slim
WORKDIR /app

# só o que precisa pra rodar o .output
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./

ENV NODE_ENV=production
ENV HOST=0.0.0.0

# o Fly vai setar $PORT em runtime
EXPOSE 8080

# aqui a mágica: passa o $PORT do Fly pro NITRO_PORT na hora
CMD ["sh", "-c", "NITRO_PORT=${PORT:-8080} HOST=0.0.0.0 node .output/server/index.mjs"]
