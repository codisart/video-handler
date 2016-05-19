#!/usr/bin/env node

var FileSystem = require('fs');
var path = require('path');

var lib = require('../index.js');
console.log(process.argv);
if (process.argv[2]) {
	var handler = lib.identifyEpisode(process.argv[2]);
	console.log(handler);
}
else {
	var files = FileSystem.readdirSync('.');
	for(var i in files) {
		if(path.extname(files[i]) === ".mkv") {
			var handler = lib.identifyEpisode(files[i]);
			console.log(handler);
		}
	}
}
