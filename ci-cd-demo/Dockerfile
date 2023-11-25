FROM node:20-alpine AS build
WORKDIR /app
RUN npm i -g pnpm
COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm build
RUN pnpm prune --prod

FROM gcr.io/distroless/nodejs20-debian12:nonroot
WORKDIR /app
USER nonroot
COPY --from=build --chown=nonroot:nonroot /app/node_modules ./node_modules
COPY --from=build --chown=nonroot:nonroot /app/dist/ ./dist/
EXPOSE 3000
ENV NODE_PORT 3000
ENV NODE_ENV production
CMD [ "dist/app.js" ]
