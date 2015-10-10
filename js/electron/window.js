/*jshint node: true*/

"use strict";

var fluid = require("infusion"),
    BrowserWindow = require("browser-window"),
    $ = fluid.registerNamespace("jQuery"),
    colin = fluid.registerNamespace("colin");

fluid.defaults("colin.electron.browserWindow", {
    gradeNames: "fluid.modelComponent",

    showOnCreate: true,

    windowOptions: {},

    members: {
        win: "@expand:colin.electron.browserWindow.create({that}.options.windowOptions)"
    },

    model: {
        dimensions: {
            width: 0,
            height: 0
        },

        url: "",

        isVisible: false
    },

    modelListeners: {
        "dimensions.*": {
            "this": "{that}.win",
            method: "setSize",
            args: ["{that}.model.dimensions.width", "{that}.model.dimensions.height"]
        },

        "url": {
            "this": "{that}.win",
            method: "loadUrl",
            args: "{change}.value"
        },

        "isVisible": {
            funcName: "colin.electron.browserWindow.updateVisibility",
            args: ["{that}.win", "{change}.value"]
        }
    },

    events: {
        onClose: null
    },

    listeners: {
        onCreate: [
            {
                changePath: "isVisible",
                value: "{that}.options.showOnCreate"
            },
            {
                "this": "{that}.win",
                method: "on",
                args: ["close", "{that}.events.onClose.fire"]
            }
        ],

        onClose: [
            "{that}.destroy()"
        ]
    }
});

colin.electron.browserWindow.create = function (windowOptions) {
    // The window size will always be initially be zero,
    // and when the model initializes, its dimensions will be updated.
    var o = $.extend(true, {}, {
        width: 0,
        height: 0
    });

    return new BrowserWindow(o);
};

colin.electron.browserWindow.updateVisibility = function (win, isVisible) {
    if (isVisible) {
        win.show();
    } else {
        win.hide();
    }
};
