'use strict';

var FileSystem			  = require('fs');
	FileSystem.mdkirpSync   = require('mkdirp').sync;
var path = require('path');

function Mover(config, sourceDirectory) {
	if(!config && !config.destinationDirectory) {
		throw 'Error';
	}

	if(!sourceDirectory) {
		throw 'Error';
	}

	var leftZerosPad = function(number) {
		return number < 10 ? '0' + number : '' + number ;
	};

	var buildNewFilePath = function(episode) {
		var buildSaisonDirectory = path.resolve(
			config.destinationDirectory,
			episode.showTitle,
			'Saison ' + leftZerosPad(episode.season, 2)
		);

		FileSystem.mdkirpSync(buildSaisonDirectory);

		return path.resolve(
			buildSaisonDirectory,
			episode.showTitle + ' S' + leftZerosPad(episode.season, 2) + 'E' + leftZerosPad(episode.episode, 2) + path.extname(episode.filePath)
		);
	};

	this.store = function(episode) {
		try {
			var oldFilePath = path.resolve(
				sourceDirectory,
				episode.filePath
			);
			var newFilePath = buildNewFilePath(episode);
			// FileSystem.renameSync(
			// 	sourceDirectory + '/' + episode.filePath,
			// 	destinationDirectory + episode.filePath
			// );
			console.log('moving file from ' + oldFilePath + ' to ' + newFilePath);
		} catch (e) {
			console.log(e);
		}
	};
}

exports	= module.exports = Mover;
