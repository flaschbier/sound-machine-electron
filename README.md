cf. https://medium.com/developers-writing/building-a-desktop-application-with-electron-204203eeb658


# Adaptions

## install

Used `npm install --save-dev electron` to install `electron@6.0.12` because `electron-prebuilt` is deprecated

## changed require

```javascript
// var app = require('app');
// var BrowserWindow = require('browser-window');
const {app, BrowserWindow} = require('electron');
```
