var fs = require('fs');
var path = require('path');

// Match this style: 00:00:17,810 --> 00:00:20,330
var timeMatch = new RegExp(/\d+\:\d+\:\d+\,\d+\s\-\-\>\s\d+\:\d+\:\d+\,\d+/);
//Matches: "0:00:00.180,0:00:02.230"
var altTimeMatch = new RegExp(/\d+\:\d+\:\d+\.\d+\,\d+\:\d+\:\d+\.\d+/);

function parseSrtFile(data, fileName) {
  var begin = ['\n\n', fileName.split('.')[0], '\n'];
  return begin.concat(data.split('\r\n')).filter(function(line) {
    return !timeMatch.test(line) && 
      !altTimeMatch.test(line) &&
      line != (line.match(/\d+/) && line.match(/\d+/)[0]);
  }).join(' ').replace(/\>\>/, '\n\n');
}

function done(fileWriter) {
  setImmediate(function() {
    fileWriter.end();
  });
}

module.exports = function(dirName, fileName) {
  var dir = process.argv[2] || dirName;
  var file = process.argv[3] || fileName || '/tmp/parsed.srt';

  if (!dir) {
    throw new Error('Directory required');
  }

  var fileWriter = fs.createWriteStream(file);

  fs.readdir(dir, function(err, files) {
    var srtFiles = files.filter(function(file) {
      return /\.srt/.test(file);
    });
    var len = srtFiles.length;

    srtFiles.forEach(function(srtFile, idx) {
      var filePath = path.join(dir, srtFile);
      var readFile = fs.readFileSync(filePath, 'utf-8');
      var srtParsed = parseSrtFile(readFile, srtFile); 
      fileWriter.write(srtParsed, 'utf-8');
      if (idx == (len - 1)) {
        done(fileWriter);
      }
    }); 
  });
}; 
