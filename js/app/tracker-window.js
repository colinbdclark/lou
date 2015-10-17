"use strict";

var fluid = require("infusion");
require("../electron/window.js");

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
