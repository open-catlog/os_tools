'use strict';

var punt = require('punt');

var cpu = require('./lib/cpu');
var process = require('./lib/process');
var disk = require('./lib/disk');
var memory = require('./lib/memory');
var network = require('./lib/network');
var io = require('./lib/io');

var client = punt.bind('127.0.0.1:5000');
var server = punt.connect('10.1.2.10:5000');

cpu(5000, server);
process(5000, server);
disk(5000, server);
memory(5000, server);
network(5000, server);
io(5000, server);