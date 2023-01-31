FROM node:16.16.0

RUN mkdir -p /home/Api-Rest-TypeScript
WORKDIR /home/Api-Rest-TypeScript

RUN apt-get update
RUN apt-get install curl -y
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install yarn -y

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 9000

CMD ["yarn", "dev"]