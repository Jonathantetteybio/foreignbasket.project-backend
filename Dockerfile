FROM node:18
WORKDIR /app
RUN npm install
COPY . /app
CMD ["node", "server.js"]