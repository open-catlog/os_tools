'use strict';

var fs = require('fs');
var async = require('async');
var address = require('address');
var child_process = require('child_process');

var getInfo = function () {
  return new Promise(function (resolve, reject) {
    child_process.exec('cat /etc/redhat-release', function (err, stdout) {
      var version = parseInt(stdout.match(/\d+/)[0]);
      child_process.exec('free -m', function (err, stdout) {
        var memory = stdout.split(/\n/);
        var mem = memory[1].split(/\s+/).slice(1);
        var free = parseInt(mem[2]);
        var total = parseInt(mem[0]);
        var swap, memFree, swapFree, available;
        if (version !== 7) {
          swap = memory[3].split(/\s+/).slice(1);
          available = parseInt(memory[2].split(/\s+/).slice(1)[2]);
        } else {
          swap = memory[2].split(/\s+/).slice(1);
          available = parseInt(mem[5]);
        }
        memFree = (available / total).toFixed(2);
        swapFree = (parseInt(swap[2]) / parseInt(swap[0])).toFixed(2);
        resolve({mem: memFree, swap: swapFree});
      });
    });
  });
}

module.exports = function (interval, client) {
  async.whilst(
    function() {return true;},
    function(callback) {
      getInfo().then(function(data) {
        client.send(address.ip() + '@memory@' + JSON.stringify(data));
        setTimeout(function() {
          callback(null);
        }, interval);
      });
    }
  );
};
