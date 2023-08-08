FROM node:20-alpine as build

WORKDIR /app

COPY package.json .

RUN yarn install

COPY tsconfig.json .

COPY ./src ./src
COPY ./prisma ./prisma

RUN yarn build

FROM node:20-alpine as execute

WORKDIR /app

COPY --from=build /app/package.json /app/package.json

RUN yarn install --prod --ignore-scripts

COPY --from=build /app/build /app/build
COPY --from=build /app/prisma /app/prisma


RUN yarn add bcrypt --no-lockfile

RUN yarn prisma generate

CMD ["yarn", "start-dev"]

