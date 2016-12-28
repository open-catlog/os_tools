'use strict';

var child_process = require('child_process');

module.exports = function () {
  return new Promise(function(resolve, reject) {
    child_process.exec('lsof | wc -l', function (err, stdout) {
      var count = stdout.trim();
      resolve(count);
    });
  });
}
