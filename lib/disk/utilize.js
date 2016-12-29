'use strict';

var fs = require('fs');
var async = require('async');
var child_process = require('child_process');

var getInfo = function() {
  return new Promise(function(resolve, reject) {
    child_process.exec('df -h', function (err, stdout) {
      var mem = stdout.split(/\n/).slice(1);
      var result = [];
      mem.forEach(function(item, index) {
        var temp = item.split(/\s+/);
        if (temp[0].charAt(0) === '/') {
          result.push({
            mount: temp[5],
            used: temp[4]
          });
        }
      });
      resolve(result);
    });
  });
}

module.exports = function (interval, dist) {
  async.whilst(
    function() {return true;},
    function(callback) {
      getInfo().then(function(data) {
        fs.appendFileSync(dist, JSON.stringify(data) + '\r\n');
        setTimeout(function() {
          callback(null);
        }, interval);
      });
    }
  );
};
