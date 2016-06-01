'use strict';

var FileSystem 	= require('fs');

var existFile = function(path) {
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

exports.existFile		= existFile;
exports.existDirectory 	= existDirectory;
