'use strict';

// var ipc = require('ipc');
const { ipcRenderer } = require('electron');
const configuration = require('configuration.js');


// handle checkboxes

var modifierCheckboxes = document.querySelectorAll('.global-shortcut');
var shortcutKeys = configuration.readSettings('shortcutKeys');
for (let i = 0; i < modifierCheckboxes.length; i++) {
    let modifierKey = modifierCheckboxes[i].attributes['data-modifier-key'].value;
    modifierCheckboxes[i].checked = shortcutKeys.indexOf(modifierKey) !== -1;
    modifierCheckboxes[i].addEventListener('click', function (e) {
        bindModifierCheckboxes(e);
    });
}

function bindModifierCheckboxes(e) {
    var shortcutKeys = configuration.readSettings('shortcutKeys');
    var modifierKey = e.target.attributes['data-modifier-key'].value;
    if (shortcutKeys.indexOf(modifierKey) !== -1) {
        var shortcutKeyIndex = shortcutKeys.indexOf(modifierKey);
        shortcutKeys.splice(shortcutKeyIndex, 1);
    } else {
        shortcutKeys.push(modifierKey);
    }
    configuration.saveSettings('shortcutKeys', shortcutKeys);
    ipcRenderer.send('set-global-shortcuts');
}

// handle close button

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function (e) {
//  ipc.send('close-settings-window');
  ipcRenderer.send('close-settings-window');
});
