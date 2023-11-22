FROM node:20.9-slim AS build
WORKDIR /app
COPY package* ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY bin/docker-entrypoint.sh bin/generate_config_js.sh /bin/
RUN chmod u+x bin/docker-entrypoint.sh bin/generate_config_js.sh
COPY --from=build /app/build /usr/share/nginx/html
ENTRYPOINT [ "/bin/docker-entrypoint.sh" ]
