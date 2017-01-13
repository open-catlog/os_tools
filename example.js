'use strict';

var cpu = require('./lib/cpu');
var disk = require('./lib/disk');
var memory = require('./lib/memory');
var process = require('./lib/process');
var network = require('./lib/network');
var io = require('./lib/io');

cpu.utilize_intime(30000, './cpu');
disk.utilize(30000, './disk');
memory.free(30000, './memory');
network.transfer(30000, './network');
io.busyness(30000, './io');
process.count(30000, './process');

