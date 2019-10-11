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
          nodeIntegration: true // support IPC etc.
      }
    });


    // register global shortcuts for sound buttons

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


// react on close button (from renderer)

ipcMain.on('close-main-window', (event, args) => {
    console.log("main: at your service :3");
    app.quit();
});


// open settings window

var settingsWindow = null;

// ipcMain.on('open-settings-window', () => {
ipcMain.on('open-settings-window', () => {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 200,
        resizable: false,
        width: 200,
        webPreferences: {
            nodeIntegration: true // support IPC etc.
        }
    });

//    settingsWindow.loadUrl('file://' + __dirname + '/app/settings.html');
    settingsWindow.loadFile('app/settings.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});


// close settings window

// ipc.on('close-settings-window', function () {
ipcMain.on('close-settings-window', () => {
    if (settingsWindow) {
        settingsWindow.close();
    }
});
