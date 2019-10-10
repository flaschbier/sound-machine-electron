'use strict';

const {app, BrowserWindow, ipcMain} = require('electron');
// var ipc = require('ipc');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
      frame: false,
      height: 700,
      resizable: false,
      width: 368,
      webPreferences: {
          nodeIntegration: true
      }
    });

//    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
    mainWindow.loadFile('app/index.html');
});

ipcMain.on('close-main-window', (event, args) => {
    console.log("main: at your service :3");
    app.quit();
});
