/*jshint node: true*/

"use strict";

var fluid = require("infusion");
fluid.registerNamespace("colin");
fluid.require(__dirname + "/../electron/window.js");

fluid.defaults("colin.lou.trackingWindow", {
    gradeNames: "colin.electron.unthrottledWindow",

    windowOptions: {
        title: "Motion tracker"
    },

    model: {
        url: "file://" + __dirname + "/../../html/motion-tracker.html",

        dimensions: {
            width: 640,
            height: 480
        }
    }
});
