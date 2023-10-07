FROM node:18

RUN mkdir -p /home/app

COPY package*.json ./

COPY . .

COPY . /home/app

EXPOSE 3000

CMD ["npm", "run", "dev"]
