/*global fluid*/

(function () {
    "use strict";

    fluid.defaults("colin.lou.motionTracker", {
        gradeNames: ["fisher.motionTracker", "colin.electron.ipcComponent"],

        channel: "motion",

        components: {
            scheduler: {
                options: {
                    freq: 10,
                    components: {
                        clock: {
                            type: "berg.clock.setInterval",
                            options: {
                                freq: "{motionTracker}.options.freq"
                            }
                        }
                    }
                }
            }
        },

        listeners: {
            onMotionUpdate: [
                {
                    func: "{that}.send"
                }
            ]
        }
    });
}());
