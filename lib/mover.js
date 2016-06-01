var store = function(episode) {
    console.log('moving file to ' + episode.showTitle + '/ '+ episode.season + '/' +  episode.episode);
};

exports.store 		= store;
