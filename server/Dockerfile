FROM node:20
WORKDIR /app
COPY package*.json ./

ENV PORT=8080
ENV JWT_SECRET_KEY=0fce6c34fa44d8354816214d95e20acb86c537e79a81aef479880c4df445fed6
ENV NODE_ENV=development
ENV DB_USERNAME=
ENV DB_PASSWORD=
ENV DB_PORT=
ENV DB_NAME=
ENV DB_HOST=
ENV FRONTEND_PROD_URL=

RUN npm install 
RUN npm rebuild bcrypt --build-from-source

COPY . .

CMD [ "npm", "start" ]