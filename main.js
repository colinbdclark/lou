var app = require("app"),
    BrowserWindow = require("browser-window"),
    mainWindow;

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("ready", function() {
    mainWindow = new BrowserWindow({
        width: 640,
        height: 480
    });

    mainWindow.loadUrl("file://" + __dirname + "/index.html");

    mainWindow.on("closed", function() {
        mainWindow = undefined;
    });
});
