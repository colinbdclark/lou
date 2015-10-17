"use strict";

var fluid = require("infusion"),
    colin = fluid.registerNamespace("colin");

require("bergson");
require("infusion-electron");
require("./config.js");

fluid.defaults("colin.lou.app", {
    gradeNames: "electron.app",

    commandLineSwitches: {
        "disable-renderer-backgrounding": null,
        "max-gum-fps": 15
    },

    env: {
        appRoot: "@expand:colin.lou.app.getRootPath()"
    },

    components: {
        audioPlayer: {
            createOnEvent: "onReady",
            type: "colin.lou.audioWindow",
            options: {
                listeners: {
                    onCreate: [
                        "electron.ipcRelay(motion, {that}.win)"
                    ]
                }
            }
        },

        tracker: {
            createOnEvent: "onCreateTracker",
            type: "colin.lou.trackingWindow"
        },

        timedRegenerator: {
            type: "berg.clock.setInterval",
            options: {
                freq: 1/2700, // Every 45 minutes.
                listeners: {
                    onTick: [
                        "{app}.events.onCreateTracker.fire()",
                        {
                            "this": "console",
                            method: "error",
                            args: ["Proactively restarting the motion tracker window after one hour."]
                        }
                    ],
                    onCreate: "{that}.start()"
                }
            }
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


fluid.defaults("colin.lou.messageStatusChecker", {
    gradeNames: ["berg.clock.setInterval", "electron.ipcComponent"],

    channel: "motion",

    freq: 1/30, // Check the message sender's status every 30 seconds.

    maxMessageInterval: 30, // The interval between messages should be no more than 30 seconds.

    members: {
        lastMessageTime: null
    },

    events: {
        onMessageInterruption: null
    },

    listeners: {
        onCreate: [
            "{that}.start"
        ],

        onMessage: [
            "colin.lou.messageStatusChecker.recordMessageTime({that})"
        ],

        onTick: [
            "colin.lou.messageStatusChecker.checkHeartbeat({that})"
        ]
    }
});

colin.lou.messageStatusChecker.recordMessageTime = function (that) {
    that.lastMessageTime = Date.now();
};

colin.lou.messageStatusChecker.checkHeartbeat = function (that) {
    if (that.lastMessageTime === null) {
        return;
    }

    var now = Date.now(),
        interval = (now - that.lastMessageTime) / 1000;
    if (interval > that.options.maxMessageInterval) {
        that.events.onMessageInterruption.fire();
    }
};
