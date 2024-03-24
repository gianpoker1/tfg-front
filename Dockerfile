FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUNnpm install -g @angular/cli
COPY . .
RUN npm run build --configuration=production

FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/tienda-electronica usr/share/nginx/html
EXPOSE 80
