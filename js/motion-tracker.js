(function () {
    "use strict";

    fluid.defaults("colin.lou.motionTracker", {
        gradeNames: "fisher.motionTracker",

        listeners: {
            onMotionUpdate: "colin.electron.ipcSend(motionUpdate, {arguments})"
        }
    });
}());
