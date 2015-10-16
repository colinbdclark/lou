/*jshint node: true*/

"use strict";

var app = require("app"),
    fluid = require("infusion"),
    colin = fluid.registerNamespace("colin");

fluid.defaults("colin.electron.app", {
    gradeNames: "fluid.modelComponent",

    members: {
        app: require("app")
    },

    commandLineSwitches: {},

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
