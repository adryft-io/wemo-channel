FROM node
RUN mkdir -p /usr/src/wemo-channel
WORKDIR /usr/src/wemo-channel
COPY package.json /usr/src/wemo-channel
RUN npm install
COPY . /usr/src/wemo-channel
EXPOSE 8080
CMD [ "npm", "start" ]