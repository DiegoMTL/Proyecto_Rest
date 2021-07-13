FROM node:12.21.0

WORKDIR /app

COPY  package*.json ./ 

RUN npm install

COPY . .

CMD [ "npm", "start"]
