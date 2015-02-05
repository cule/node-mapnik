#!/usr/bin/env node

var binary = require('node-pre-gyp'),
    fs = require('fs'),
    path = require('path'),
    bindingPath = binary.find(path.resolve(__dirname, '..', 'package.json')),
    shapeindex = path.join(path.dirname(bindingPath), 'shapeindex'),
    spawn = require('child_process').spawn;

if (process.platform === 'win32') {
  shapeindex += '.exe';
}

if (!fs.existsSync(shapeindex)) {
  console.error("shapeindex tool not found at expected path: '" +shapeindex + "'");
  process.exit(-1);
}

var proc = spawn(shapeindex, process.argv.slice(2))
  .on('error', function(err) {
    console.error(err);
  })
  .on('exit', function(code) {
    process.exit(code);
  });

proc.stdout.pipe(process.stdout);
proc.stderr.pipe(process.stderr);
