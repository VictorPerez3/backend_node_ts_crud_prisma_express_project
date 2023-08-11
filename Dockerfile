FROM node:20.3.1-alpine as build

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

FROM node:20.3.1-alpine as execute

WORKDIR /app

COPY --from=build /app/package.json /app/package.json

RUN yarn install --prod --ignore-scripts

COPY --from=build /app/.env.docker /app/.env.docker
COPY --from=build /app/build /app/build
COPY --from=build /app/prisma /app/prisma

RUN yarn prisma generate

CMD ["yarn", "start"]

