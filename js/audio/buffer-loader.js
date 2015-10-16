/*global fluid, flock*/

(function () {
    "use strict";

    fluid.defaults("colin.lou.pianoGuitarBufferLoader", {
        gradeNames: "flock.bufferLoader",

        bufferDefs: [
            {
                id: "high-piano",
                url: "../audio/44100/dsharp-piano-44100.wav"
            },
            {
                id: "low-piano",
                url: "../audio/44100/low-f-piano-44100.wav"
            },
            {
                id: "high-guitar",
                url: "../audio/44100/csharp-guitar-44100.wav"
            },
            {
                id: "low-guitar",
                url: "../audio/44100/low-b-guitar-44100.wav"
            }
        ],

        listeners: {
            afterBuffersLoaded: [
                // TODO: Remove this when triggerBuffers is fixed.
                "colin.lou.pianoGuitarBufferLoader.updateBufferUGens({pianoGuitar})"
            ]
        }
    });

    colin.lou.pianoGuitarBufferLoader.updateBufferUGens = function (synth) {
        synth.get("pianoPlayer").onInputChanged();
        synth.get("guitarPlayer").onInputChanged();
    };
}());
