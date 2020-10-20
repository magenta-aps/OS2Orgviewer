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


FROM nginx:1-alpine AS dist
LABEL org.opencontainers.image.title="OS2OrgViewer" \
      org.opencontainers.image.vendor="Magenta ApS" \
      org.opencontainers.image.licenses="MPL-2.0" \
      org.opencontainers.image.url="https://git.magenta.dk/rammearkitektur/os2orgviewer" \
      org.opencontainers.image.source="https://git.magenta.dk/rammearkitektur/os2orgviewer"
# Copy in configuration script
COPY ./docker/30-sed-on-index-html.sh /docker-entrypoint.d/30-sed-on-index-html.sh
RUN chmod 775 /docker-entrypoint.d/30-sed-on-index-html.sh

# Copy in os2orgviewer
COPY --from=builder /code/dist/frederikshavn-med /usr/share/nginx/html
