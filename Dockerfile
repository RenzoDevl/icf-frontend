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

COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./

# >>> pega a porta que o Fly manda
ENV PORT=8080
ENV NITRO_PORT=${PORT}
ENV HOST=0.0.0.0

EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]
