var colin = {};

(function () {
    "use strict";

    var ipc = require("ipc");

    colin.electron = {
        ipcSender: function (channel, target) {
            var args = [channel];

            return function () {
                var len = arguments.length + 1;
                args.length = len;
                for (var i = 1; i < len; i++) {
                    args[i] = arguments[i - 1];
                }

                if (target) {
                    target.send.apply(target, args);
                }
            };
        },

        ipcRelay: function (channel, target) {
            ipc.on(channel, colin.electron.ipcSender(channel, target));
        }
    };

    if (module && module.exports) {
        module.exports = colin.electron;
    }
}());
