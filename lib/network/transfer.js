'use strict';

var fs = require('fs');
var child_process = require('child_process');

var getInfo = function () {

  var readMB = 0;
  var sendMB = 0;
  var network = fs.readFileSync('../../test', 'utf8');
  var cards = network.split(/\n\n/);
  cards.forEach(function (cardInfo) {
    var cardName = cardInfo.match(/.+:/) + '';
    if (cardName.indexOf('lo') !== 0) {
      var rx = (cardInfo.match(/\s*[^]RX.*/m) + '').trim();
      var tx = (cardInfo.match(/\s*[^]TX.*/m) + '').trim();
      if (rx !== 'null' && tx !== 'null') {
        readMB = parseInt(((rx.match(/bytes\s\d+/) + '').match(/\d+/) + '')) / (1024 * 1024);
        sendMB = parseInt(((tx.match(/bytes\s\d+/) + '').match(/\d+/) + '')) / (1024 * 1024);
      }
    }
  });
};

getInfo();

// return new Promise(function(resolve, reject) {
//    child_process.exec('ifconfig', function (err, stdout) {
//    });
//  });
