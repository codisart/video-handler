#!/usr/bin/env node

var FileSystem 	= require('fs');

var program		= require('commander');
var lib 		= require('./lib/identifier.js');
var Mover 		= require('./lib/mover.js');
var coercion 	= require('./lib/coercion.js');
var logger 		= require('./lib/logger.js');

program
	.version('0.0.2')
	.option('-K, --kind <n>', 'The kind of torrent', /^(single|multi)$/i, false)
	.option('-D, --directory <n>', 'An valid directory path', coercion.getValidFilesListFromDirectory, false)
	.option('-F, --file <n>', 'An valid file path', coercion.getValidFilesListFromFile, false)
	.parse(process.argv);

if(!program.kind) {
	logger.error('We need to know the kind of the downloaded torrent');
	process.exit(1);
}

if (program.kind === 'single') {
	var errorMessage = 'The file is not valid; neither a video nor a subtitle.';
	var files = program.file;
	var srcDirectory = '.';
} else if (program.kind === 'multi') {
	var errorMessage = 'The directory is not valid; do not exist or do not contains valid files.';
	var files = program.directory.files;
	var srcDirectory = program.directory.path;
}

if(!files || files.length <= 0) {
	logger.error(errorMessage);
	process.exit(1);
}

var mover = new Mover('config', srcDirectory);

var wasAtLeastOneFileProcessed = false;
for (var index in files) {
	var filePath = files[index];

	var episode = lib.identifyEpisode(filePath);

	if (!episode) {
		logger.info('We could not identify this file. - ' + filePath);
		continue;
	}

	mover.store(episode);
	wasAtLeastOneFileProcessed = true;
}

if (wasAtLeastOneFileProcessed) {
	// TODO: implements the clear action
	logger.info('We can delete all the downloaded files.');
}
