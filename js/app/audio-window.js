"use strict";

var fluid = require("infusion"),
    electron = require("infusion-electron");

fluid.defaults("colin.lou.audioWindow", {
    gradeNames: "electron.unthrottledWindow",

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
    },

    components: {
        relayer: {
            type: "colin.lou.audioWindow.relayer"
        }
    },

    listeners: {
        onClose: [
            "{relayer}.stop()"
        ]
    }
});

fluid.defaults("colin.lou.audioWindow.relayer", {
    gradeNames: "electron.ipcMessageRelayer",

    channel: "motion",

    members: {
        source: electron.ipc,
        target: "{audioWindow}.win"
    }
});
