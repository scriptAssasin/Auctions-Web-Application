FROM node:14-alpine

LABEL description="This is the new auctions UI."

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install
RUN npm audit fix

COPY . .

EXPOSE 3000

CMD ["npm", "start"]