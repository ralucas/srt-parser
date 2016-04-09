#!/usr/bin/env node
'use strict';
var meow = require('meow');
var srtParser = require('./')();

var cli = meow([
  'Usage',
  '  $ srt-parser [input]',
  '',
  'Options',
  '  --foo  Lorem ipsum. [Default: false]',
  '',
  'Examples',
  '  $ srt-parser',
  '  unicorns',
  '  $ srt-parser rainbows',
  '  unicorns & rainbows'
]);
