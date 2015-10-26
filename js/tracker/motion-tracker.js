/*global fluid*/

(function () {
    "use strict";

    fluid.defeatLogging = true;

    fluid.defaults("colin.lou.motionTracker", {
        gradeNames: ["fisher.motionTracker", "electron.ipcComponent"],

        channel: "motion",

        source: {
            name: "FaceTime"
        },

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
            },

            streamer: {
                options: {
                    source: "{motionTracker}.options.source"
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

    fluid.defaults("colin.lou.frontMotionTracker", {
        gradeNames: "colin.lou.motionTracker",

        channel: "frontMotion",

        source: {
            name: "VF0520 Live! Cam Sync (041e:406c)"
        }
    });

    fluid.defaults("colin.lou.backMotionTracker", {
        gradeNames: "colin.lou.motionTracker",

        channel: "backMotion",

        source: {
            name: "VF0520 Live! Cam Sync #2 (041e:406c)"
        }
    });

    fluid.defaults("colin.lou.stereoMotionSource", {
        gradeNames: "fluid.modelComponent",

        components: {
            front: {
                type: "colin.lou.frontMotionTracker"
            }
        }
    });

    fluid.defaults("colin.lou.quadraphonicMotionSource", {
        gradeNames: "colin.lou.stereoMotionSource",

        events: {
            onFirstStreamConnected: null
        },

        components: {
            front: {
                options: {
                    components: {
                        streamer: {
                            options: {
                                events: {
                                    onStreamConnected: "{quadraphonicMotionSource}.events.onFirstStreamConnected"
                                }
                            }
                        }
                    }
                }
            },

            back: {
                createOnEvent: "onFirstStreamConnected",
                type: "colin.lou.backMotionTracker"
            }
        }
    });
}());
