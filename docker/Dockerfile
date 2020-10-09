FROM node:14 as build-stage
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./ .
RUN npm run build

FROM nginx:1-alpine as production-stage
# Copy in configuration script
COPY ./docker/30-sed-on-index-html.sh /docker-entrypoint.d/30-sed-on-index-html.sh
RUN chmod +x /docker-entrypoint.d/30-sed-on-index-html.sh
# Copy in os2orgviewer
COPY --from=build-stage /app/dist /usr/share/nginx/html
