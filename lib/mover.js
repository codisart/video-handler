'use strict';

var FileSystem			  = require('fs');
	FileSystem.mdkirpSync   = require('mkdirp').sync;

function Mover(config, sourceDirectory) {
	if(!config) {
		throw 'Error';
	}
	if(!sourceDirectory) {
		throw 'Error';
	}
	var config		  = config;
	var sourceDirectory = sourceDirectory;

	var buildNewPath = function(episode) {
		return episode.filePath;
	}

	this.store = function(episode) {
		var destinationDirectory = '/var/www/video-handler/dest/';

		try {
			FileSystem.mdkirpSync(destinationDirectory);
			FileSystem.renameSync(
				sourceDirectory + '/' + episode.filePath,
				destinationDirectory + episode.filePath
			);
			console.log('moving file from ' + sourceDirectory + '/' + episode.filePath + ' to ' + destinationDirectory + episode.filePath);
		} catch (e) {
			console.log(e);
		}
	};
}

exports	= module.exports = Mover;
