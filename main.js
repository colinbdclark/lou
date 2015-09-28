var app = require("app"),
    BrowserWindow = require("browser-window"),
    electronUtils = require(__dirname + "/js/electron-utils.js"),
    windows = {};

function createWindow (name, url, options) {
    var window = new BrowserWindow(options);
    windows[name] = window;
    window.loadUrl(url);
    window.on("closed", function() {
        delete windows[name];
    });

    return window;
}

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("ready", function() {
    createWindow("audio", "file://" + __dirname + "/html/audio.html", {
        width: 100,
        height: 100
    });

    createWindow("tracking", "file://" + __dirname + "/html/motion-tracker.html", {
        width: 640,
        height: 480
    });

    electronUtils.ipcRelay("motionUpdate", windows.audio);
});
