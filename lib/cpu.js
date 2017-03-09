'use strict';

var fs = require('fs');
var address = require('address');

module.exports = function (interval, client) {
  var preTotal = 0;
  var postTotal = 0;
  var preIdle = 0;
  var postIdle = 0;
  var utilization;

  setInterval(function () {
    postTotal = 0;
    postIdle = 0;
    fs.readFileSync('/proc/stat', 'utf8')
      .split(/\n/)[0]
      .split(/\s+/)
      .slice(1)
      .map(function (value, index) {
        postTotal += parseInt(value);
        if (index === 3) {
          postIdle = parseInt(value);
        }
      });
    if (preTotal) {
      if (postTotal > preTotal) {
        utilization = ((1 - (postIdle - preIdle) / (postTotal - preTotal))).toFixed(2);
      } else {
        utilization = 0;
      }
    } else {
      utilization = ((postTotal - postIdle) / postTotal).toFixed(2);
    }
    preTotal = postTotal;
    preIdle = postIdle;
    client.send(address.ip() + '@cpu@' + utilization);
  }, interval);
};
