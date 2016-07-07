var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
require('dotenv').config({silent: true});
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var Consumer = require('sqs-consumer');
server.listen(8080);
  
var worker = Consumer.create({
  queueUrl: 'https://sqs.us-east-1.amazonaws.com/971458161724/wemo-channel',
  handleMessage: function (message, done) {
    io.emit("message", message.Body);
    done();
    console.log('message from queue is', message.Body);
  },
  sqs: new AWS.SQS()
});
worker.on('error', function (err) {
  console.log('err from app.js is', err.message);
});
worker.start();




