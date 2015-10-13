(function () {
    "use strict";

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

    flock.init({
        numBuses: 8,
        bufferSize: 4096
    });

    fluid.defaults("colin.lou", {
        gradeNames: "fluid.component",

        components: {
            left: {
                type: "colin.lou.instrument.left"
            },

            right: {
                type: "colin.lou.instrument.right"
            },

            motionResponder: {
                type: "colin.lou.motionResponder"
            },

            interconnects: {
                type: "colin.lou.interconnects"
            },

            bufferLoader: {
                type: "colin.lou.bufferLoader"
            }
        },

        listeners: {
            "{bufferLoader}.events.afterBuffersLoaded": [
                "{flock.enviro}.play()"
            ]
        }
    });
}());
