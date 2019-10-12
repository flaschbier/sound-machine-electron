'use strict';

const {app, BrowserWindow, ipcMain, globalShortcut} = require('electron');
// var ipc = require('ipc');
// var globalShortcut = require('global-shortcut');
// const configuration = require('app/js/configuration');
const configuration = require('./app/js/configuration');


var mainWindow = null;

app.on('ready', function() {
    if (!configuration.readSettings('shortcutKeys')) {
        configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
    }

    mainWindow = new BrowserWindow({
      frame: false,
      height: 700,
      resizable: false,
      width: 368,
      webPreferences: {
          nodeIntegration: true // support IPC etc.
      }
    });

    setGlobalShortcuts();

//    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
    mainWindow.loadFile('app/index.html');

    mainWindow.webContents.openDevTools();
});


// register global shortcuts for sound buttons

function setGlobalShortcuts() {
  globalShortcut.unregisterAll();
  var keys = configuration.readSettings('shortcutKeys');
  var prefix = keys.length === 0 ? '' : keys.join('+') + '+';
  for (let i=1; i<=4; i++) {
    globalShortcut.register(prefix+i, () => {
        mainWindow.webContents.send('global-shortcut', i-1);
    });
  }
}


// react on close button (from renderer)

ipcMain.on('close-main-window', (event, args) => {
    console.log("main: received close-main-window");
    app.quit();
});


// open settings window

var settingsWindow = null;

// ipcMain.on('open-settings-window', () => {
ipcMain.on('open-settings-window', () => {
    console.log("main: received open-settings-window");
    if (settingsWindow) {
        console.log("already open.")
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
    settingsWindow.webContents.openDevTools();

    settingsWindow.on('closed', function () {
      console.log("settingsWindow: received closed");
      settingsWindow = null;
    });
});


// rect on settings changes

ipcMain.on('set-global-shortcuts', () => {
    console.log("main: received set-global-shortcuts");
    setGlobalShortcuts();
});



// close settings window

// ipc.on('close-settings-window', function () {
ipcMain.on('close-settings-window', () => {
    console.log("main: received close-settings-window");
    if (settingsWindow) {
        settingsWindow.close();
    }
});
