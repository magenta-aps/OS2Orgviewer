# SPDX-FileCopyrightText: 2019-2020 Magenta ApS
# SPDX-License-Identifier: MPL-2.0

################################################################################
# Changes to this file requires approval from Labs. Please add a person from   #
# Labs as required approval to your MR if you have any changes.                #
################################################################################

FROM node:14 AS builder

WORKDIR /code/frontend

# Install packages
COPY app/package*.json ./
RUN npm install

# Copy in and build source
COPY app ./
RUN npm run build


FROM python:3 AS templater

WORKDIR /code/

RUN pip install --no-cache-dir j2cli==0.3.10

COPY ./docker/default.conf.template.j2 /code/default.conf.template.j2
COPY ./docker/whitelist.json.j2 /code/whitelist.json.j2
RUN j2 whitelist.json.j2 -o whitelist.json && j2 -f json default.conf.template.j2 whitelist.json -o default.conf.template


FROM nginx:1-alpine AS dist
LABEL org.opencontainers.image.title="OS2OrgViewer" \
      org.opencontainers.image.vendor="Magenta ApS" \
      org.opencontainers.image.licenses="MPL-2.0" \
      org.opencontainers.image.url="https://git.magenta.dk/rammearkitektur/os2orgviewer" \
      org.opencontainers.image.source="https://git.magenta.dk/rammearkitektur/os2orgviewer"
# Copy in configuration script
COPY ./docker/25-symlink-html.sh /docker-entrypoint.d/25-symlink-html.sh
RUN chmod 775 /docker-entrypoint.d/25-symlink-html.sh

COPY ./docker/30-sed-on-index-html.sh /docker-entrypoint.d/30-sed-on-index-html.sh
RUN chmod 775 /docker-entrypoint.d/30-sed-on-index-html.sh

# Copy in nginx configuration
COPY --from=templater ./code/default.conf.template /etc/nginx/templates/default.conf.template

# Copy in os2orgviewer
COPY --from=builder ./code/dist /code/dist
