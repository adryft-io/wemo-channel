FROM node
RUN mkdir -p /usr/src/wemo
WORKDIR /usr/src/wemo
COPY package.json /usr/src/wemo/
RUN npm install
COPY . /usr/src/wemo
EXPOSE 8080
CMD [ "npm", "start"]
