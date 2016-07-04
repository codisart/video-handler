#!/usr/bin/env node

var OperatingSystem = require('os');
var ChildProcess = require('child_process');

if (OperatingSystem.platform() == 'linux') {
    ChildProcess.execSync('xdg-open config.json > /dev/null');
} else if (OperatingSystem.platform() == 'win32') {
    ChildProcess.execSync('notepad config.json');
}
