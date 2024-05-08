FROM node:18
WORKDIR /app
RUN npm install
COPY . /app
CMD ["npm", "start"]