FROM node:latest
WORKDIR /app
COPY package.json ./
RUN npm config set proxy "http://proxy"
RUN npm install
COPY . .
CMD ["npm", "start"]