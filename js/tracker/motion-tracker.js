(function () {
    "use strict";

    fluid.defaults("colin.lou.motionTracker", {
        gradeNames: ["fisher.motionTracker", "colin.electron.ipcComponent"],

        channel: "motion",

        distributeOptions: {
            target: "{fisher.frameScheduler}.options.freq",
            source: 10
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
