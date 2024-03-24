FROM node:14 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17-alpine
COPY --from=build /app/dist/tienda-electronica usr/share/nginx/html
