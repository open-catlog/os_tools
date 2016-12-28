'use strict';

var cpu = require('./lib/cpu');
var process = require('./lib/process');
var disk = require('./lib/disk');
var memory = require('./lib/memory');

cpu.utilize_intime(2000);

disk.utilize().then(function(data) {
  console.log('disk:' + data);
});

memory.free().then(function(data) {
  console.log('memory:' + data);
});

process.count().then(function(data) {
  console.log('process:' + data);
});
