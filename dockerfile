FROM node:17-alpine3.12

WORKDIR /src

COPY *.json ./

RUN yarn 

RUN yarn add ts-node typescript typeorm -g

COPY . . 

EXPOSE 5051

CMD ["yarn", "start:office"]