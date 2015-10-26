"use strict";

var fluid = require("infusion");
require("infusion-electron");

fluid.defaults("colin.lou.trackingWindow", {
    gradeNames: "electron.unthrottledWindow",

    windowOptions: {
        title: "Motion tracker"
    },

    model: {
        url: {
            expander: {
                funcName: "fluid.stringTemplate",
                args: ["{colin.lou.config}.options.trackerWindowURL", "{app}.options.env"]
            }
        },

        dimensions: {
            width: 640,
            height: 480
        }
    }
});
