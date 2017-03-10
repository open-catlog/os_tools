'use strict';

var fs = require('fs');
var async = require('async');
var address = require('address');
var child_process = require('child_process');

var getInfo = function () {

  return new Promise(function (resolve, reject) {
    child_process.exec('cat /etc/redhat-release', function (err, stdout) {
      var version = parseInt(stdout.match(/\d+/)[0]);
      child_process.exec('ifconfig', function (err, stdout) {
        var data = {};
        var cards = stdout.split(/\n\n/);
        cards.forEach(function (cardInfo) {
          let cardName;
          if (version !== 7) {
            cardName = cardInfo.split(/\s/)[0];
          } else {
            cardName = cardInfo.match(/.+:/) + '';
          }
          if (cardName && cardName.indexOf('lo') !== 0) {
            if (version !== 7) {
              let rtx = (cardInfo.match(/RX.*/g)[1] + '').trim();
              if (rtx !== 'null') {
                let readMB = parseInt(((rtx.match(/bytes:\d+/g)[0] + '').match(/\d+/) + '')) / (1024 * 1024);
                let sendMB = parseInt(((rtx.match(/bytes:\d+/g)[1] + '').match(/\d+/) + '')) / (1024 * 1024);
                data[cardName] = { readMB: readMB, sendMB: sendMB };
              }
            } else {
              let rx = (cardInfo.match(/\s*[^]RX.*/m) + '').trim();
              let tx = (cardInfo.match(/\s*[^]TX.*/m) + '').trim();
              if (rx !== 'null' && tx !== 'null') {
                let readMB = parseInt(((rx.match(/bytes\s\d+/) + '').match(/\d+/) + '')) / (1024 * 1024);
                let sendMB = parseInt(((tx.match(/bytes\s\d+/) + '').match(/\d+/) + '')) / (1024 * 1024);
                data[cardName] = { readMB: readMB, sendMB: sendMB };
              }
            }
          }
        });
        resolve(data);
      });
    });
  });
}

//单位是MB/s
module.exports = function (interval, client) {
  var preData = null;
  var result = {};
  async.whilst(
    function () { return true; },
    function (callback) {
      getInfo().then(function (data) {
        setTimeout(function () {
          if (preData) {
            for (var key in data) {
              var readRate = ((data[key].readMB - preData[key].readMB) / interval).toFixed(2);
              var sendRate = ((data[key].sendMB - preData[key].sendMB) / interval).toFixed(2);
              result[key] = { read: readRate, send: sendRate };
            }
            client.send(address.ip() + '@network@' + JSON.stringify(result));
          }
          preData = data;
          callback(null);
        }, interval);
      });
    }
  );
};
