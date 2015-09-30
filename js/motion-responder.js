/*global fluid, colin*/

(function () {
    "use strict";

    fluid.defaults("colin.lou.motionResponder", {
        gradeNames: ["colin.electron.ipcComponent", "fluid.modelComponent"],

        channel: "motion",

        model: {
            leftMotion: 0,
            rightMotion: 0
        },

        listeners: {
            onMessage: [
                {
                    func: "{that}.applier.change",
                    args: [
                        "",
                        {
                            leftMotion: "{arguments}.1",
                            rightMotion: "{arguments}.2"
                        }
                    ]
                }
            ]
        }
    });
}());
