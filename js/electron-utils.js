var colin = {};

(function () {
    "use strict";

    var ipc = require("ipc");

    colin.electron = {
        ipcSend: function (channel, args) {
            ipc.send(channel, args);
        },

        ipcRelay: function (channel, target) {
            var args = [channel];

            ipc.on(channel, function () {
                args.length = arguments.length;
                for (var i = 1; i < arguments.length; i++) {
                    args[i] = arguments[i];
                }

                if (target) {
                    target.send.apply(target, args);
                }
            });
        }
    };

    if (module && module.exports) {
        module.exports = colin.electron;
    }
}());
