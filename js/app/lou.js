"use strict";

var fluid = require("infusion"),
    colin = fluid.registerNamespace("colin");

require("bergson");
require("infusion-electron");
require("./config.js");

fluid.defaults("colin.lou.app", {
    gradeNames: "electron.app",

    commandLineSwitches: {
        "disable-renderer-backgrounding": null
    },

    env: {
        appRoot: "@expand:colin.lou.app.getRootPath()"
    },

    components: {
        audioPlayer: {
            createOnEvent: "onReady",
            type: "colin.lou.audioWindow"
        },

        tracker: {
            createOnEvent: "onCreateTracker",
            type: "colin.lou.trackingWindow"
        }
    },

    events: {
        onCreateTracker: null
    },

    listeners: {
        onReady: [
            "{that}.events.onCreateTracker.fire()"
        ]
    }
});

colin.lou.app.getRootPath = function () {
    return "file://" + process.cwd();
};


fluid.defaults("colin.lou.trackerRegenerator", {
    gradeNames: "berg.clock.setInterval",

    freq: 1/1800, // Every 30 minutes.

    listeners: {
        onTick: [
            {
                func: "{app}.events.onCreateTracker.fire"
            },

            {
                "this": "console",
                method: "out",
                args: ["Proactively restarting the motion tracker window after one hour."]
            }
        ],

        onCreate: [
            "{that}.start()"
        ]
    }
});
