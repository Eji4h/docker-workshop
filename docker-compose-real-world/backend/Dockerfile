FROM node:20.9-slim AS build
WORKDIR /app
COPY package* ./
RUN npm i
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs20-debian12:nonroot
WORKDIR /app
USER nonroot
COPY --from=build --chown=nonroot:nonroot /app/node_modules ./node_modules
COPY --from=build --chown=nonroot:nonroot /app/dist/ ./dist/
EXPOSE 3000
ENV NODE_PORT 3000
ENV NODE_ENV production
CMD [ "dist/app.js" ]