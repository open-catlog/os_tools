'use strict';

var cpu = require('./lib/cpu');
var disk = require('./lib/disk');
var memory = require('./lib/memory');
var process = require('./lib/process');
var network = require('./lib/network');
var io = require('./lib/io');

cpu.utilize_intime(3000, './cpu');
disk.utilize(3000, './disk');
memory.free(3000, './memory');
network.transfer(3000, './network');
io.busyness(3000, './io');
process.count(3000, './process');

