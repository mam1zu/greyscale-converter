FROM node:18

WORKDIR /usr/src/app

COPY packages/backend/package*.json .

RUN npm install

COPY packages/backend .
EXPOSE 8000
CMD ["npm", "start"]