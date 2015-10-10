(function () {
    "use strict";

    fluid.defaults("colin.lou.motionTracker", {
        gradeNames: ["fisher.motionTracker", "colin.electron.ipcComponent"],

        channel: "motion",

        components: {
            scheduler: {
                options: {
                    freq: 10
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
