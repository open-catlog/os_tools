'use strict';

var cpu = require('./lib/cpu');
var disk = require('./lib/disk');
var memory = require('./lib/memory');
var process = require('./lib/process');

cpu.utilize_intime(3000, './cpu');
disk.utilize(3000, './disk');
memory.free(3000, './memory');
