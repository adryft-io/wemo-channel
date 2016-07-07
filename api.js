require('dotenv').config({silent: true});
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});
var Consumer = require('sqs-consumer');
server.listen(8080);

var sqs = new AWS.SQS();

sqs.getQueueUrl({ QueueName: 'wemo-channel' }, function(err, data) {
  if (err) console.log(err);
  var worker = Consumer.create({
    queueUrl: data.QueueUrl,
    handleMessage: function (message, done) {
      console.log('message from queue is', message.Body);
      io.emit("message", message.Body);
      console.log('io is', io);
      done();
    },
    sqs: sqs
  });
  worker.on('error', function (err) {
    console.log('err from app.js is', err.message);
  });
  worker.start();
});
