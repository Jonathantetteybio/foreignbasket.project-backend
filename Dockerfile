FROM node:18
RUN apk add --no-cache
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["node", "server.js"]
EXPOSE 3003