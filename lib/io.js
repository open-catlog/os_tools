'use strict';

var fs = require('fs');
var async = require('async');
var address = require('address');
var child_process = require('child_process');

var getInfo = function () {
  return new Promise(function(resolve, reject) {
    var data = {};
    child_process.exec('iostat -k', function (err, stdout) {
      var devices = stdout.split(/\n\n/)[2].split(/\n/).slice(1);
      devices.forEach(function (device) {
        var temp = device.split(/\s+/);
        data[temp[0]] = {read: temp[4], wrtn: temp[5]};
      });
      resolve(data);
    });
  });
}

//单位是kb/s
module.exports = function (interval, client) {
  var preData = null;
  var result = {};
  async.whilst(
    function() {return true;},
    function(callback) {
      getInfo().then(function(data) {
        setTimeout(function() {
          if (preData) {
            for (var key in data) {
              var readRate = ((data[key].read - preData[key].read) / interval).toFixed(2);
              var wrtnRate = ((data[key].wrtn - preData[key].wrtn) / interval).toFixed(2);
              result[key] = {read: readRate, wrtn: wrtnRate};
            }
            client.send(address.ip() + '@io@' + JSON.stringify(result));
          }
          preData = data;
          callback(null);
        }, interval);
      });
    }
  );
};
