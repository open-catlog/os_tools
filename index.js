'use strict';

var punt = require('punt');
var forever = require('forever-monitor');

var cpu = require('./lib/cpu');
var process = require('./lib/process');
var disk = require('./lib/disk');
var memory = require('./lib/memory');
var network = require('./lib/network');
var io = require('./lib/io');

var client = punt.bind('127.0.0.1:5000');
var server = punt.connect('10.1.2.10:5000');
var child = new (forever.Monitor)(__filename, {
  max: 3,
  silent: true
});

cpu(30000, server);
process(30000, server);
disk(30000, server);
memory(30000, server);
network(30000, server);
io(30000, server);

child.on('watch:restart', function(info) {
    console.error('Restaring script because ' + info.file + ' changed');
});
 
child.on('restart', function() {
    console.error('Forever restarting script for ' + child.times + ' time');
});
 
child.on('exit:code', function(code) {
    console.error('Forever detected script exited with code ' + code);
});

child.start();

