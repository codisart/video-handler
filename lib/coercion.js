'use strict';

var FileSystem 	= require('fs');
var path = require('path');

var validFileExtensions = [
	'.mkv',
	'.avi',
	'.mp4',
	'.srt',
];

function hasValidExtension(filePath) {
	return validFileExtensions.indexOf(path.extname(filePath)) !== -1;
}

var getValidFilesListFromFile = function(path) {
	try {
		if (FileSystem.statSync(path).isFile() && hasValidExtension(path)) {
			return [path];
		}
		else {
			return false;
		}
	}
	catch (e) {
		return false;
	}
};

var getValidFilesListFromDirectory = function(path) {
	try {
		if (FileSystem.statSync(path).isDirectory()) {
			return {
				files : FileSystem.readdirSync(path).filter(
					hasValidExtension
				),
				path : path
			};
		}
		else {
			return false;
		}
	}
	catch (e) {
		console.log(e);
		return false;
	}
};

exports.getValidFilesListFromFile		= getValidFilesListFromFile;
exports.getValidFilesListFromDirectory 	= getValidFilesListFromDirectory;
