'use strict';

var child_process = require('child_process');

module.exports = function () {
 return new Promise(function(resolve, reject) {
    child_process.exec('df -h', function (err, stdout) {
      var mem = stdout.split(/\n/).slice(1);
      var result = [];
      mem.forEach(function(item, index) {
        var temp = item.split(/\s+/);
        console.log(temp);
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
};

