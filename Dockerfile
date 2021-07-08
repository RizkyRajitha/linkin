#globle 
ARG DATABASE_URL
ARG HASHSALT
ARG RAILWAY=0
# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

ENV NEXT_TELEMETRY_DISABLED 1

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci


# Rebuild the source code only when needed
FROM node:alpine AS builder

ARG DATABASE_URL
ARG RAILWAY=0

ENV DATABASE_URL=$DATABASE_URL
ENV RAILWAY=$RAILWAY

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run prismagenerate

RUN chmod +x railwaymigrate.sh
RUN ./railwaymigrate.sh ${RAILWAY}

RUN npm run build-next 

#RUN npm ci && npm run build-next 
#&& yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:alpine AS runner

ARG DATABASE_URL
ARG HASHSALT

ENV DATABASE_URL=$DATABASE_URL
ENV HASHSALT=$HASHSALT

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts
#COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]
