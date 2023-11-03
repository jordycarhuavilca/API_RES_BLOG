FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm install -g nodemon

COPY . /usr/src/app

EXPOSE 3000

EXPOSE 3300

CMD ["npm", "run", "start"]
