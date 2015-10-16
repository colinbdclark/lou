/*jshint node: true*/

var fluid = require("infusion");
fluid.registerNamespace("colin");
fluid.require(__dirname + "/../electron/window.js");

fluid.defaults("colin.lou.audioWindow", {
    gradeNames: "colin.electron.unthrottledWindow",

    windowOptions: {
        title: "Audio"
    },

    model: {
        url: "file://" + __dirname + "/../../html/audio.html",

        dimensions: {
            width: 100,
            height: 100
        }
    }
});
