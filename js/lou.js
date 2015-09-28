(function () {
    "use strict";

    flock.init({
        numBuses: 6,
        bufferSize: 8192
    });

    fluid.defaults("colin.lou", {
        gradeNames: "fluid.component",

        components: {
            left: {
                type: "colin.lou.instrument.left"
            },

            right: {
                type: "colin.lou.instrument.right"
            }
        },

        listeners: {
            onCreate: [
                "{flock.enviro}.play()"
            ]
        }
    });
}());
