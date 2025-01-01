#Stage 1:
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install 
RUN npm rebuild bcrypt --build-from-source
COPY . .
CMD [ "npm", "start" ]