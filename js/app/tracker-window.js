"use strict";

var fluid = require("infusion");
require("infusion-electron");

fluid.defaults("colin.lou.trackingWindow", {
    gradeNames: "electron.unthrottledWindow",

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
