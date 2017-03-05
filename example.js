'use strict';

var cpu = require('./produce/cpu');
var disk = require('./produce/disk');
var memory = require('./produce/memory');
var process = require('./produce/process');
var network = require('./produce/network');
var io = require('./produce/io');

cpu.utilize_intime(30000, './cpu');
disk.utilize(30000, './disk');
memory.free(30000, './memory');
network.transfer(30000, './network');
io.busyness(30000, './io');
process.count(30000, './process');

