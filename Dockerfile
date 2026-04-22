# Contoh deploy container (Railway, dll.)
# Mount volume persisten ke path yang sama dengan env UPLOADS_DIR (mis. /data/uploads).
FROM node:20-bookworm-slim
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci

COPY . .

ARG DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/placeholder
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production
ENV UPLOADS_DIR=/data/uploads
ENV PORT=3000

RUN mkdir -p /data/uploads

EXPOSE 3000
CMD ["npm", "run", "start"]
