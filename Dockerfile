FROM node:12.16.1-alpine

WORKDIR /app

# copy code
COPY . .

RUN npm i

# Expose is NOT supported by Heroku
# EXPOSE 3000

CMD ["node", "app.js"]
