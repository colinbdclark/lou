/*jshint node: true*/

"use strict";

var fluid = require("infusion");
fluid.registerNamespace("colin");
fluid.require(__dirname + "/../electron/core.js");
fluid.require(__dirname + "/../electron/app.js");

fluid.defaults("colin.lou.app", {
    gradeNames: "colin.electron.app",

    components: {
        audio: {
            createOnEvent: "onReady",
            type: "colin.lou.audioWindow",
            options: {
                listeners: {
                    onCreate: [
                        "colin.electron.ipcRelay(motion, {that}.win)"
                    ]
                }
            }
        },

        tracking: {
            createOnEvent: "onReady",
            type: "colin.lou.trackingWindow"
        }
    }
});
