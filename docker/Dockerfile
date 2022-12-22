# SPDX-FileCopyrightText: 2019-2020 Magenta ApS
# SPDX-License-Identifier: MPL-2.0

################################################################################
# Changes to this file requires approval from Labs. Please add a person from   #
# Labs as required approval to your MR if you have any changes.                #
################################################################################

FROM node:14 AS builder

WORKDIR /code/frontend

# Install packages using npm
COPY app/package.json ./
COPY app/package-lock.json ./
RUN npm ci

# Copy in and build source
COPY app ./

RUN npm run build


FROM nginx:1-alpine AS dist
LABEL org.opencontainers.image.title="OS2OrgViewer" \
      org.opencontainers.image.vendor="Magenta ApS" \
      org.opencontainers.image.licenses="MPL-2.0" \
      org.opencontainers.image.url="https://git.magenta.dk/rammearkitektur/os2orgviewer" \
      org.opencontainers.image.source="https://git.magenta.dk/rammearkitektur/os2orgviewer"

COPY ./docker/25-symlink-html.sh /docker-entrypoint.d/25-symlink-html.sh
RUN chmod 775 /docker-entrypoint.d/25-symlink-html.sh

COPY ./docker/30-sed-on-index-html.sh /docker-entrypoint.d/30-sed-on-index-html.sh
RUN chmod 775 /docker-entrypoint.d/30-sed-on-index-html.sh

COPY --from=builder ./code/dist /code/dist
