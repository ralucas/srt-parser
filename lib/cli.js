#!/usr/bin/env node
'use strict';
var meow = require('meow');
var srtParser = require('./')();

var cli = meow([
  'Usage',
  '  $ srt-parser [srt_directory] [output_file.md]',
  '',
  'Example',
  '  $ srt-parser ~/srtDirs/Chapter_5/ chapter_5.md'
]);
