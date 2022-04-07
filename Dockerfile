FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
COPY yarn.lock .
RUN yarn install --immutable --immutable-cache --check-cache
COPY . .
CMD ["yarn", "start"]