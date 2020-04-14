FROM node:10

LABEL maintainer = "anderson.cardozo@ucp.edu.co"
LABEL version ="1.0"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]