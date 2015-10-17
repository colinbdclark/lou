/*jshint node: true*/

"use strict";

var fluid = require("infusion"),
    colin = fluid.registerNamespace("colin");

// Monkey-patch fluid.log for Electron's broken console.log.
fluid.doLog = function (args) {
    if (typeof (console) !== "undefined") {
        if (console.debug) {
            console.debug(args.join(" "));
        } else if (typeof (console.log) === "function") {
            console.log(args.join(" "));
        }
    }
};


fluid.defaults("colin.electron.app", {
    gradeNames: "fluid.modelComponent",

    members: {
        app: require("app")
    },

    commandLineSwitches: {},

    env: {
        appRoot: "@expand:colin.electron.app.getRootPath()"
    },

    windowListeners: {
        "onClose": "colin.electron.app.quitOnAllClosed()"
    },

    events: {
        onReady: null,
        onAllWindowsClosed: null
    },

    listeners: {
        onCreate: [
            {
                funcName: "colin.electron.app.setCommandLineSwitches",
                args: ["{that}.app", "{that}.options.commandLineSwitches"]
            },
            {
                "this": "{that}.app",
                method: "on",
                args: ["window-all-closed", "{that}.events.onAllWindowsClosed.fire"]
            },
            {
                "this": "{that}.app",
                method: "on",
                args: ["ready", "{that}.events.onReady.fire"]
            }
        ],

        onAllWindowsClosed: [
            {
                "this": "{that}.app",
                method: "quit"
            }
        ]
    }
});

colin.electron.app.setCommandLineSwitches = function (app, commandLineSwitches) {
    fluid.each(commandLineSwitches, function (value, switchName) {
        if (value === null) {
            app.commandLine.appendSwitch(switchName);
        } else {
            app.commandLine.appendSwitch(switchName, value);
        }
    });
};

colin.electron.app.getRootPath = function () {
    return "file://" + process.cwd();
};
