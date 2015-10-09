/*jshint node: true*/

"use strict";

var fluid = require("infusion");
fluid.registerNamespace("colin");

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
