var path = require('path');

var videoExtensions = [
    '.mkv',
    '.avi',
];

function Episode() {
    this.season     = null;
    this.episode    = null;
    this.showTitle  = null;
    this.filePath   = null;
}

function notUndefined(element) {
  return element !== undefined;
}

var identifyEpisode = function(filename) {
    // https://regex101.com/r/cH2zT0/2
    var regexYear       = /(?:19|20)\d{2}/;
    var regexSeparator  = /[ (_.]+/;
    var regexSXXEXX     = /S(?:0(\d)|(\d{2}))E(?:0(\d)|(\d{2}))/;
    var regex3Numbers   = /(\d)(?:0(\d)|(\d{2}))/;

    /* jshint ignore:start */
    var re = new RegExp(
            '(?:'
        +       '^(?:\\[.+\\][ (_.]+)?(.+)'
        +       regexSeparator.source
        +       regexYear.source
        +       regexSeparator.source
        +       '(?:'
        +           regexSXXEXX.source
        +           '|'
        +           regex3Numbers.source
        +       ')'
        +      '|'
        +       '^(?:\\[.+\\][ (_.]+)?(.+)'
        +       regexSeparator.source
        +       '(?:'
        +           regexSXXEXX.source
        +           '|'
        +           regex3Numbers.source
        +       ')'
        +   ')'
        +   '(?:$|[ (_.]+)',
        'g'
    );
    /* jshint ignore:end */

    var matches = re.exec(filename);

    if (matches) {
        matches = matches.filter(notUndefined);
        var regexTitle = /([A-Za-z1-9]{2,})[ (_.]+/g;
        var regexTitleEnd = /([A-Za-z1-9]{2,})$/g;
        var episode = new Episode();
            episode.showTitle   =
                matches[1]
                    .replace(regexTitle, function(match, $1){ return $1.charAt(0).toUpperCase() + $1.slice(1) + ' ';})
                    .replace(regexTitleEnd, function(match, $1){ return $1.charAt(0).toUpperCase() + $1.slice(1);});
            episode.season      = matches[2];
            episode.episode     = matches[3];

        return episode;
    }

    return matches;
};

var isVideoFile = function(filePath) {
    return hasValidExtension(filePath, videoExtensions);
};

function hasValidExtension(filePath, validFileExtensions) {
    return validFileExtensions.indexOf(path.extname(filePath)) !== -1;
}

exports.identifyEpisode = identifyEpisode;
exports.isVideoFile     = isVideoFile;
