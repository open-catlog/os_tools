'use strict';

var fs = require('fs');
var async = require('async');
var address = require('address');
var child_process = require('child_process');

var getInfo = function() {
  return new Promise(function (resolve, reject) {
    child_process.exec('df -h', function (err, stdout) {
      var mem = stdout.split(/\n/).slice(1);
      var data = {};
      mem.forEach(function(item, index) {
        var temp = item.split(/\s+/);
        if (temp[0].charAt(0) === '/') {
          data[temp[0]] = {mount: temp[5], used: temp[4]};
        }
      });
      resolve(data);
    });
  });
}

module.exports = function (interval, client) {
  async.whilst(
    function() {return true;},
    function(callback) {
      getInfo().then(function(data) {
        client.send(address.ip() + '@disk@' + JSON.stringify(data));
        setTimeout(function() {
          callback(null);
        }, interval);
      });
    }
  );
};
