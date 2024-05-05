FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV development

RUN npm run build

CMD [ "npm", "run", "start:dev" ]

EXPOSE 4000
