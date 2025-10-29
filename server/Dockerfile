# 1) 依赖安装阶段
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2) 构建阶段 - 生成 Prisma Client 并编译 TypeScript
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./
# 生成 Prisma Client
RUN npx prisma generate
# 编译 TypeScript
RUN npm run build

# 3) 运行镜像
FROM node:20-alpine
WORKDIR /app

# 安装 OpenSSL 和其他运行时依赖
RUN apk add --no-cache openssl libc6-compat

ENV NODE_ENV=production
ENV PORT=8000

# 只复制生产环境需要的文件
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY prisma ./prisma

# 暴露应用端口
EXPOSE 8000

# 启动服务（如果需要运行迁移，请在首次部署时手动执行）
CMD [ "node", "dist/src/index.js" ]
