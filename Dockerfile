# ─────────────── Build stage ───────────────
FROM node:22-slim AS builder
WORKDIR /app

# pnpm 11 vía corepack (corepack@0.35.0 evita el bug de dynamic import)
RUN npm install -g corepack@0.35.0 \
    && corepack enable \
    && corepack prepare pnpm@11.1.1 --activate

# Copia primero los manifiestos para aprovechar la caché de capas
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY astro.config.mjs tsconfig.json ./

# Instala dependencias
RUN pnpm install --frozen-lockfile

# Copia el resto del código y construye
COPY src/ ./src/
COPY public/ ./public/
RUN pnpm run build

# ─────────────── Runtime stage ───────────────
FROM node:22-slim AS runtime
WORKDIR /app

RUN npm install -g corepack@0.35.0 \
    && corepack enable \
    && corepack prepare pnpm@11.1.1 --activate

# Astro preview escucha en 0.0.0.0:4321
ENV HOST=0.0.0.0
ENV PORT=4321

# Solo copiamos lo necesario para servir el sitio estático
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/astro.config.mjs ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 4321
CMD ["pnpm", "run", "preview", "--", "--host"]
