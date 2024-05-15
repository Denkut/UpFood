FROM node:20

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/Frontend
RUN npm install -g npm@latest
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/Backend
RUN npm i

EXPOSE 3003

CMD [ "node", "app.js" ]
