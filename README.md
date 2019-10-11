cf. https://medium.com/developers-writing/building-a-desktop-application-with-electron-204203eeb658

# Why do I work thru this tutorial

This blog, and the repo, is full of outdated code that requires fixing which adds very little to better understanding. It's not well-thought exercises but simple making-up in a room that ssems abandoned for two years. So why not go somewhere else?

Well, this blog has the great advantage to not rely on other complex libraries like
Angular, React, Vue, Builder or so. So it's a primer for Electron only, and that's what I was after. Funnily, there are little other blogs that start without much other overhead. So it might be even worth the effort to create an updated version of it. We will see...

# Adaptions

## install

Used `npm install --save-dev electron` to install `electron@6.0.12` because `electron-prebuilt` is deprecated

https://github.com/bojzi/sound-machine-electron-guide/issues/13

## changed require

```javascript
// var app = require('app');
// var BrowserWindow = require('browser-window');
const {app, BrowserWindow} = require('electron');
```

https://github.com/bojzi/sound-machine-electron-guide/issues/3

## Futher Issues

Further issues will be tracked as GitHub issues in https://github.com/flaschbier/sound-machine-electron/issues/ because it very much looks like it will be tons.
