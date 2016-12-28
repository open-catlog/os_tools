'use strict';

var fs = require('fs');
var child_process = require('child_process');

function a(interval) {
// return new Promise(function(resolve, reject) {
//    child_process.exec('ifconfig', function (err, stdout) {
//    });
//  });

  var network = fs.readFileSync('../../test', 'utf8');
  var cards = network.split(/\n\n/);
  cards.forEach(function (card) {
    console.log(card);
  });
};

a();
