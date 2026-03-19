FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 2046

# CMD ["npm", "run", "dev"]