var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
require('dotenv').config({silent: true});
var AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});
var Consumer = require('sqs-consumer');
server.listen(8080);
  
var worker = Consumer.create({
  queueUrl: process.env.QUEUE_URL,
  handleMessage: function (message, done) {
    console.log('message from queue is', message.Body);
    io.emit("message", message.Body);
    done();
  },
  sqs: new AWS.SQS()
});
worker.on('error', function (err) {
  console.log('err from app.js is', err.message);
});
worker.start();
