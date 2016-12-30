'use strict';

var fs = require('fs');
var async = require('async');
var child_process = require('child_process');

var getInfo = function () {

  return new Promise(function (resolve, reject) {
    child_process.exec('ifconfig', function (err, stdout) {
      var data = {};
      var cards = stdout.split(/\n\n/);
      cards.forEach(function (cardInfo) {
        var cardName = cardInfo.match(/.+:/) + '';
        if (cardName.indexOf('lo') !== 0) {
          var rx = (cardInfo.match(/\s*[^]RX.*/m) + '').trim();
          var tx = (cardInfo.match(/\s*[^]TX.*/m) + '').trim();
          if (rx !== 'null' && tx !== 'null') {
            var readMB = parseInt(((rx.match(/bytes\s\d+/) + '').match(/\d+/) + '')) / (1024 * 1024);
            var sendMB = parseInt(((tx.match(/bytes\s\d+/) + '').match(/\d+/) + '')) / (1024 * 1024);
            data[cardName] = {readMB: readMB, sendMB: sendMB};
          }
        }
      });
      resolve(data);
    });
  });
}

module.exports = function (interval, dist) {
  var preData = null;
  var result = {};
  async.whilst(
    function() {return true;},
    function(callback) {
      getInfo().then(function (data) {
        setTimeout(function() {
          if (preData) {
            for (var key in data) {
              var readRate = ((data[key].readMB - preData[key].readMB) / interval).toFixed(2) + 'MB/s';
              var sendRate = ((data[key].sendMB - preData[key].sendMB) / interval).toFixed(2) + 'MB/s';
              result[key] = {read: readRate, send: sendRate};
            }
            fs.appendFileSync(dist, JSON.stringify(result) + '\r\n');
          }
          preData = data;
          callback(null);
        }, interval);
      });
    }
  );
};
