'use strict';

var punt = require('punt');

var cpu = require('./lib/cpu');
var process = require('./lib/process');
var disk = require('./lib/disk');
var memory = require('./lib/memory');
var network = require('./lib/network');
var io = require('./lib/io');

var client = punt.connect('10.1.2.11:5000');

cpu(3000, client);
process(3000, client);
disk(3000, client);
memory(3000, client);
network(3000, client);
io(3000, client);