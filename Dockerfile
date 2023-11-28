FROM node:18-alpine

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 9000

CMD ["yarn", "dev"]