'use strict';

function Mover(config) {
    if(!config) {
        throw 'Error';
    }
	var  config = config;

	this.store = function(episode) {
        console.log('moving file from ' + episode.filePath);
    };
}

exports	= module.exports = Mover;
