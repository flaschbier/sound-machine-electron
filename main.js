'use strict';

const {app, BrowserWindow} = require('electron');
var ipc = require('ipc');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
      frame: false,
      height: 700,
      resizable: false,
      width: 368
    });

//    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
    mainWindow.loadFile('app/index.html');
});

ipc.on('close-main-window', function () {
    app.quit();
});
