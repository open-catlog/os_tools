'use strict';

var fs = require('fs');
var async = require('async');
var address = require('address');
var child_process = require('child_process');

var getInfo = function () {
  return new Promise(function (resolve, reject) {
    child_process.exec('lsof | wc -l', function (err, stdout) {
      var count = stdout.trim();
      resolve(count);
    });
  });
}

module.exports = function (interval, client) {
  async.whilst(
    function() {return true;},
    function(callback) {
      getInfo().then(function(data) {
        client.send(address.ip() + '@process@' + data);
        setTimeout(function() {
          callback(null);
        }, interval);
      });
    }
  );
};
