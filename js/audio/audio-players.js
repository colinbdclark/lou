/*global fluid, flock*/

(function () {
    "use strict";

    flock.init({
        numBuses: 12,
        bufferSize: 2048,
        chans: 4
    });

    fluid.defeatLogging = true;

    fluid.defaults("colin.lou.audio", {
        gradeNames: "fluid.modelComponent",

        components: {
            motionTarget: {
                type: "colin.lou.quadraphonicMotionTarget"
            },

            interconnects: {
                type: "colin.lou.interconnects"
            }
        }
    });

    fluid.defaults("colin.lou.audio.all", {
        gradeNames: "colin.lou.audio",

        components: {
            instrument: {
                type: "colin.lou.instrument.allVoices"
            }
        }
    });

    fluid.defaults("colin.lou.audio.pianoGuitar", {
        gradeNames: "colin.lou.audio",

        components: {
            instrument: {
                type: "colin.lou.instrument.pianoGuitarVoices"
            }
        }
    });

    fluid.defaults("colin.lou.audio.drumBass", {
        gradeNames: "colin.lou.audio",

        components: {
            instrument: {
                type: "colin.lou.instrument.drumBassVoices"
            }
        },

        listeners: {
            onCreate: [
                "{flock.enviro}.play()"
            ]
        }
    });
}());
