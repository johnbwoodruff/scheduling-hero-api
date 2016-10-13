FROM node:argon

# Create app directory
RUN mkdir /app
WORKDIR /app

RUN npm install -g nodemon

# Install app dependencies
COPY package.json /app/package.json
COPY .jshintrc /app/.jshintrc
COPY .env /app/.env
RUN npm install

# Bundle app source
COPY ./src /app/src

EXPOSE 3000
EXPOSE 5858

CMD ["npm", "start"]
