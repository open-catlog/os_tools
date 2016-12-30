'use strict';

var fs = require('fs');
var async = require('async');
var child_process = require('child_process');

var getInfo = function () {
  return new Promise(function (resolve, reject) {
    child_process.exec('lsof | wc -l', function (err, stdout) {
      var count = stdout.trim();
      resolve(count);
    });
  });
}

module.exports = function (interval, dist) {
  async.whilst(
    function() {return true;},
    function(callback) {
      getInfo().then(function(data) {
        fs.appendFileSync(dist, data + ' ');
        setTimeout(function() {
          callback(null);
        }, interval);
      });
    }
  );
};
