'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cpuSchema = new Schema({
  server: {
    type: String
  },
  utilization: {
    type: String
  },
  create_at: {
    type: Date,
    default: Date.now
  }
});

cpuSchema.statics.add = function (server, utilization) {
  let context = this;
  return new Promise(function (resolve, reject) {
    content.create({
      server: server,
      utilization: utilization
    }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

cpuSchema.statics.getByServer

mongoose.model('cpu', cpuSchema);
var cpu = mongoose.model('cpu');

model.exports = cpu;