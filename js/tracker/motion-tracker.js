/*global fluid*/

(function () {
    "use strict";

    fluid.defeatLogging = true;

    fluid.defaults("colin.lou.motionTracker", {
        gradeNames: ["fisher.motionTracker", "electron.ipcComponent"],

        channel: "motion",

        components: {
            scheduler: {
                options: {
                    freq: 10,
                    components: {
                        clock: {
                            type: "berg.clock.autoAudioContext",
                            options: {
                                blockSize: 4096
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
