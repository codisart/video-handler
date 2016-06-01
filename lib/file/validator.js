'use strict';

var FileSystem 	= require('fs');
var path = require('path');

var validFileExtensions = [
    '.mkv',
    '.avi',
    '.mp4',
    '.srt',
];

var existDirectory = function(path) {
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

var isMediaFile = function(path) {
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
}

function hasValidExtension(filePath) {
	console.log(validFileExtensions);
    return validFileExtensions.indexOf(path.extname(filePath)) !== -1;
}

exports.isMediaFile		= isMediaFile;
exports.existDirectory 	= existDirectory;
