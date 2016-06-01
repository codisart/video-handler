#!/usr/bin/env node

var FileSystem 	= require('fs');

var program	= require('commander');
var lib 	= require('./lib/identifier.js');
var mover 	= require('./lib/mover.js');

function existDirectory(path) {
	try {
		if (FileSystem.statSync(path).isDirectory()) {
			return path;
		}
		else {
			return false;
		}
	}
	catch (e) {
		return false;
	}
}

function existFile(path) {
	try {
		if (FileSystem.statSync(path).isFile()) {
			return path;
		}
		else {
			return false;
		}
	}
	catch (e) {
		return false;
	}
}

program
	.version('0.0.2')
	.option('-K, --kind <n>', 'The kind of torrent', /^(single|multi)$/i, false)
	.option('-D, --directory <n>', 'An valid directory path', existDirectory, false)
	.option('-F, --file <n>', 'An valid file path', existFile, false)
	.parse(process.argv);


if(!program.kind) {
	console.log('We need to know the kind of torrent downloading');
	process.exit(1);
}

if (program.kind === 'single') {
	if(!program.file) {
		console.log('The filepath doesn\'t not exist');
		process.exit(1);
	}

	var files = [program.file];
}

if (program.kind === 'multi') {
	if(!program.directory) {
		console.log('The directory doesn\'t not exist');
		process.exit(1);
	}

	var files = FileSystem.readdirSync(program.directory);
}

if (files.length > 0) {
	var wasAtLeastOneFileProcessed = false;
	for (var index in files) {
		var filePath = files[index];

		var episode = lib.identifyEpisode(filePath);

		if (!episode) {
			console.log('We could not identify the tv show the season or the episode');
			continue;
		}

		mover.store(episode);
		wasAtLeastOneFileProcessed = true;
	}

	if (wasAtLeastOneFileProcessed) {
		console.log('delete all other files');
	}
}
