'use strict';
const { ipcRenderer } = require('electron');


// set up the sound buttons

var soundButtons = document.querySelectorAll('.button-sound');

for (var i = 0; i < soundButtons.length; i++) {
    var soundButton = soundButtons[i];
    var soundName = soundButton.attributes['data-sound'].value;

    prepareButton(soundButton, soundName);
}

function prepareButton(buttonEl, soundName) {
    buttonEl.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

//    var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
    var audio = new Audio('wav/' + soundName + '.wav');
    buttonEl.addEventListener('click', function () {
        audio.currentTime = 0;
        audio.play();
    });
}


// process close button

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', (event, args) => {
    console.log("renderer: close me!");
    ipcRenderer.send('close-main-window');
});


// react on keyboard events (from main)

// ipc.on('global-shortcut', function (arg) {
ipcRenderer.on('global-shortcut', (event, arg) => {
    var event = new MouseEvent('click');
    console.log(arg);
    soundButtons[arg].dispatchEvent(event);
});


// process settings button

var settingsEl = document.querySelector('.settings');
settingsEl.addEventListener('click', (event, args) => {
    ipcRenderer.send('open-settings-window');
});
