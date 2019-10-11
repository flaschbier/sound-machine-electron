'use strict';

// var ipc = require('ipc');
const { ipcRenderer } = require('electron');

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function (e) {
//  ipc.send('close-settings-window');
  ipcRenderer.send('close-settings-window');
});
