'use strict';

function Logger() {
	var log = function(level, message) {
		console.log(level + ': ' + message);
	};

	this.error = function(message) {
		log('error', message);
	};

	this.info = function(message) {
		log('info', message);
	};
}

exports	= module.exports = new Logger();
