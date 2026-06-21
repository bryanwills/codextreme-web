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
# El sitio es estático (output: "static" en astro.config.mjs), así que lo
# servimos con nginx en vez de `astro preview` (que es un dev server y hace
# un deps-status-check de pnpm que puede fallar al arrancar el contenedor).
FROM nginx:alpine AS runtime

# nginx escuchando en 4321 (coincide con ports_exposes y los labels de traefik)
# + SPA fallback para que las rutas client-side resuelvan a index.html
RUN printf 'server {\n\
    listen 4321;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    # Cache inmutable para assets con hash\n\
    location /_astro/ {\n\
        add_header Cache-Control "public, max-age=31536000, immutable";\n\
    }\n\
    location /assets/ {\n\
        add_header Cache-Control "public, max-age=31536000, immutable";\n\
    }\n\
\n\
    # Cabeceras de seguridad básicas\n\
    add_header X-Frame-Options "DENY" always;\n\
    add_header X-Content-Type-Options "nosniff" always;\n\
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;\n\
}\n' > /etc/nginx/conf.d/default.conf

# Solo copiamos el output estático del builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 4321
CMD ["nginx", "-g", "daemon off;"]
