/*global fluid, flock*/

(function () {
    "use strict";

    flock.init({
        numBuses: 8,
        bufferSize: 8192
    });

    fluid.defaults("colin.lou.audio", {
        gradeNames: "fluid.component",

        components: {
            motionResponder: {
                type: "colin.lou.motionResponder"
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
