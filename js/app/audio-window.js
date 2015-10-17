"use strict";

var fluid = require("infusion");
require("../electron/window.js");

fluid.defaults("colin.lou.audioWindow", {
    gradeNames: "colin.electron.unthrottledWindow",

    windowOptions: {
        title: "Audio"
    },

    model: {
        url: {
            expander: {
                funcName: "fluid.stringTemplate",
                args: ["{colin.lou.config}.options.audioWindowURL", "{app}.options.env"]
            }
        },

        dimensions: {
            width: 100,
            height: 100
        }
    }
});
