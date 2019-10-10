'use strict';

const {app, BrowserWindow} = require('electron');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });

//    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
    mainWindow.loadFile('app/index.html');
});
