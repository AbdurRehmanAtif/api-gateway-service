FROM node:20-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . ./

RUN npm run build

FROM node:20-alpine as production

ARG NODE_ENV=producton
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

COPY private-key.pem /private-key.pem
COPY public-key.pem /public-key.pem

RUN npm install --only=production

COPY --from=development /usr/src/app/dist .

CMD ["node", "dist/index.js"]