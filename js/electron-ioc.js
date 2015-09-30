(function () {
    "use strict";

    fluid.defaults("colin.electron.ipcComponent", {
        gradeNames: "fluid.component",

        channel: "message", // User-specified.

        mergePolicy: {
            "members.ipc": "nomerge",
            "members.target": "nomerge"
        },

        members: {
            ipc: require("ipc"),
            target: "{that}.ipc",
            sender: "@expand:colin.electron.ipcSender({that}.options.channel, {that}.target)"
        },

        invokers: {
            send: {
                func: "{that}.sender"
            }
        },

        events: {
            onMessage: null
        },

        listeners: {
            onCreate: [
                {
                    "this": "{that}.ipc",
                    method: "on",
                    args: ["{that}.options.channel", "{that}.events.onMessage.fire"]
                }
            ]
        }
    });
}());
