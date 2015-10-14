/*jshint node: true*/

"use strict";

var app = require("app"),
    fluid = require("infusion");

fluid.registerNamespace("colin");

app.commandLine.appendSwitch("disable-renderer-backgrounding");
app.commandLine.appendSwitch("max-gum-fps", 15);

fluid.defaults("colin.electron.app", {
    gradeNames: "fluid.modelComponent",

    members: {
        app: require("app")
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
