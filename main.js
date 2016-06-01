#!/usr/bin/env node

var FileSystem 	= require('fs');

var program		= require('commander');
var lib 		= require('./lib/identifier.js');
var mover 		= require('./lib/mover.js');
var coercion 	= require('./lib/coercion.js');

program
	.version('0.0.2')
	.option('-K, --kind <n>', 'The kind of torrent', /^(single|multi)$/i, false)
	.option('-D, --directory <n>', 'An valid directory path', coercion.getValidFilesListFromDirectory, false)
	.option('-F, --file <n>', 'An valid file path', coercion.getValidFilesListFromFile, false)
	.parse(process.argv);


if(!program.kind) {
	console.log('Error: We need to know the kind of the downloaded torrent');
	process.exit(1);
}

if (program.kind === 'single') {
	var errorMessage = 'Error: The file is not valid; neither a video nor a subtitle.';
	var files = program.file;
} else if (program.kind === 'multi') {
	var errorMessage = 'Error: The directory is not valid; do not exist or do not contains valid files.';
	var files = program.directory;
}

if(!files || files.length <= 0) {
	console.log(errorMessage);
	process.exit(1);
}

var wasAtLeastOneFileProcessed = false;
for (var index in files) {
	var filePath = files[index];

	var episode = lib.identifyEpisode(filePath);

	if (!episode) {
		console.log('Error: We could not identify this file. - ' + filePath);
		continue;
	}

	mover.store(episode);
	wasAtLeastOneFileProcessed = true;
}

if (wasAtLeastOneFileProcessed) {
	// TODO: implements the clear action
	console.log('Tmp: We can delete all the downloaded files.');
}
