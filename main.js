'use strict';

const {app, BrowserWindow, ipcMain, globalShortcut} = require('electron');
// var ipc = require('ipc');
// var globalShortcut = require('global-shortcut');

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
    // globalShortcut.register('ctrl+shift+1', function () {
    //     mainWindow.webContents.send('global-shortcut', 0);
    // });
    // globalShortcut.register('ctrl+shift+2', function () {
    //     mainWindow.webContents.send('global-shortcut', 1);
    // });
    for (let i=1; i<=4; i++) {
      globalShortcut.register('ctrl+shift+'+i, function () {
          mainWindow.webContents.send('global-shortcut', i-1);
      });
    }

//    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
    mainWindow.loadFile('app/index.html');
});

ipcMain.on('close-main-window', (event, args) => {
    console.log("main: at your service :3");
    app.quit();
});
