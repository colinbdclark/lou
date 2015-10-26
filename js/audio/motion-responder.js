/*global fluid*/

(function () {
    "use strict";

    fluid.defaults("colin.lou.motionResponder", {
        gradeNames: ["electron.ipcComponent", "fluid.modelComponent"],

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


    fluid.defaults("colin.lou.frontMotionResponder", {
        gradeNames: "colin.lou.motionResponder",

        channel: "frontMotion"
    });

    fluid.defaults("colin.lou.backMotionResponder", {
        gradeNames: "colin.lou.motionResponder",

        channel: "backMotion"
    });


    /**
     * Base motion grade that only relays the "front" model.
     */
    fluid.defaults("colin.lou.motionTarget", {
        gradeNames: "fluid.modelComponent",

        model: {
            front: {
                leftMotion: 0,
                rightMotion: 0
            },

            back: {
                leftMotion: 0,
                rightMotion: 0
            }
        },

        components: {
            front: {
                type: "colin.lou.frontMotionResponder",
                options: {
                    model: "{motionTarget}.model.front"
                }
            }
        }
    });


    /**
     * A single-camera motion component, which
     * relays the camera's left and right motion values
     * to both the front and back models,
     * simulating a quadraphonic source of motion data.
     */
    fluid.defaults("colin.lou.stereoToQuadMotionTarget", {
        gradeNames: "colin.lou.motionTarget",

        model: {
            back: {
                leftMotion: "{stereoToQuadMotionTarget}.model.front.leftMotion",
                rightMotion: "{stereoToQuadMotionTarget}.model.front.rightMotion"
            }
        }
    });

    /**
     * A two-camera motion component consisting of two separate
     * motion responders, representing the front and back view
     * of the room.
     */
    fluid.defaults("colin.lou.quadraphonicMotionTarget", {
        gradeNames: "colin.lou.motionTarget",

        model: {
            front: {
                leftMotion: 0,
                rightMotion: 0
            },

            back: {
                leftMotion: 0,
                rightMotion: 0
            }
        },

        components: {
            back: {
                type: "colin.lou.backMotionResponder",
                options: {
                    model: "{quadraphonicMotionTarget}.model.back"
                }
            }
        }
    });
}());
