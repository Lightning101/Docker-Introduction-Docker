'use strict';
const mongoose = require('mongoose');
const serverIP = require("./config");

const mongoServerLocation = serverIP.MONGODB_IP;

const mongoPort = serverIP.MONGODB_PORT;
const dbName = "Hero";

var connectionURL = 'mongodb://' + mongoServerLocation + ':' + mongoPort + '/' + dbName;


mongoose.connect(connectionURL);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', ()=>
{
  console.log("Waiting for monogdb");
  var stop = new Date().getTime();
    while(new Date().getTime() < stop + 2000) {
    }

  mongoose.connect(connectionURL);
});
db.once('open', function() {
  // we're connected!
  console.log("Connected to DB succesfully");
});

module.exports = db;
