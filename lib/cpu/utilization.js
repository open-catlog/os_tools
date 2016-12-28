'use strict';

var fs = require('fs');

module.exports = function () {
  var stat = fs.readFileSync('/proc/stat', 'utf8');
  var cpu = stat.split(/\n/);
  var items = cpu[0].split(/\s/).slice(2);
  var total = 0;
  var used = 0;
  var utilization;

  items.map(function (value, index) {
    total += parseInt(value);
    if (index !== 3) {
      used += parseInt(value);
    }
  });

  utilization = (used * 100 / total).toFixed(2) + '%';
  return utilization;
};
