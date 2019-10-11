'use strict';

// var ipc = require('ipc');
const { ipcRenderer } = require('electron');
const configuration = require('configuration');


// handle checkboxes

var modifierCheckboxes = document.querySelectorAll('.global-shortcut');
console.log(`${modifierCheckboxes.length} checkboxes found`);
var shortcutKeys = configuration.readSettings('shortcutKeys');
for (let i = 0; i < modifierCheckboxes.length; i++) {
    let modifierKey = modifierCheckboxes[i].attributes['data-modifier-key'].value;
    modifierCheckboxes[i].checked = shortcutKeys.indexOf(modifierKey) !== -1;
    console.log(`settings: add event handler for ${modifierKey}`);
    modifierCheckboxes[i].addEventListener('click', function (e) {
        console.log(`modifierCheckbox ${modifierKey}: received click`);
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
    console.log("settings: send set-global-shortcuts");
    ipcRenderer.send('set-global-shortcuts');
}

// handle close button

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function (e) {
  console.log("closeEl: received click");
//  ipc.send('close-settings-window');
  ipcRenderer.send('close-settings-window');
});
