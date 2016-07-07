var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
require('dotenv').config();
var AWS = require('aws-sdk');
AWS.config.credentials =  new AWS.SharedIniFileCredentials({ profile: 'newreactions' });
AWS.config.update({region: 'us-east-1'});
var Consumer = require('sqs-consumer');
server.listen(8080);
  
var worker = Consumer.create({
  queueUrl: process.env.queue_URL,
  handleMessage: function (message, done) {
    io.emit("message", message.Body);
    done();
    console.log('message from queue is', message.Body);
  },
  sqs: new AWS.SQS()
});
worker.on('error', (err) => {
  console.log('err from app.js is', err.message);
});
worker.start();





