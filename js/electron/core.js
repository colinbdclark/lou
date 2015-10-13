var fluid = fluid || require("infusion");

(function () {
    "use strict";

    var electron = fluid.registerNamespace("colin.electron");

    electron.ipcSender = function (channel, target) {
        var args = [channel];

        return function () {
            var len = arguments.length + 1;
            args.length = len;
            for (var i = 1; i < len; i++) {
                args[i] = arguments[i - 1];
            }

            // TODO: This will cause an error if "target"
            // is a window that has already been closed.
            if (target) {
                target.send.apply(target, args);
            }
        };
    };

    electron.ipcRelay = function (channel, target) {
        require("ipc").on(channel, electron.ipcSender(channel, target));
    };


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
