# Для контейнеризации
#FROM node:current-alpine as build-stage
#FROM node:20-alpine as build-stage
#
#WORKDIR /app
#
#COPY . .
#
#RUN npm install
#RUN npm run build
#
#FROM nginx:1.23.3-alpine as production-stage
#
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=build-stage /app/dist /usr/share/nginx/html
