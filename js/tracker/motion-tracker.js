(function () {
    "use strict";

    fluid.defaults("colin.lou.motionTracker", {
        gradeNames: ["fisher.motionTracker", "colin.electron.ipcComponent"],

        channel: "motion",

        listeners: {
            onMotionUpdate: [
                {
                    func: "{that}.send"
                }
            ]
        }
    });
}());
