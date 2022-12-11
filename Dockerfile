FROM node:16-alpine 

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY ./ ./
RUN npm run build
RUN npm install -g serve

EXPOSE 3000

CMD [ "npx", "serve", "-s", "build" ]