/*global fluid, flock*/

(function () {
    "use strict";

    fluid.defaults("colin.lou.interconnects", {
        gradeNames: "fluid.component",

        pianoClockBus: "@expand:{flock.enviro}.busManager.acquireNextBus(interconnect)",
        guitarClockBus: "@expand:{flock.enviro}.busManager.acquireNextBus(interconnect)",
        drumClockBus: "@expand:{flock.enviro}.busManager.acquireNextBus(interconnect)"
    });

    // TODO: Convert this to a flock.band?
    fluid.defaults("colin.lou.instrument", {
        gradeNames: "fluid.component",

        invokers: {
            play: "{flock.enviro}.play()",
            stop: "{flock.enviro}.stop()"
        }
    });

    fluid.defaults("colin.lou.instrument.all", {
        gradeNames: "colin.lou.instrument",

        components: {
            pianoClock: {
                type: "colin.lou.synths.pianoClock"
            },

            guitarClock: {
                type: "colin.lou.synths.guitarClock"
            },

            drumClock: {
                type: "colin.lou.synths.drumClock"
            },

            drumBass: {
                type: "colin.lou.synths.drumBass"
            },

            pianoGuitar: {
                type: "colin.lou.synths.pianoGuitar"
            }
        }
    });

    fluid.defaults("colin.lou.instrument.left", {
        gradeNames: "colin.lou.instrument",

        components: {
            drumClock: {
                type: "colin.lou.synths.drumClock"
            },

            drumBass: {
                type: "colin.lou.synths.drumBass"
            }
        }
    });

    fluid.defaults("colin.lou.instrument.right", {
        gradeNames: "colin.lou.instrument",

        components: {
            pianoClock: {
                type: "colin.lou.synths.pianoClock"
            },

            guitarClock: {
                type: "colin.lou.synths.guitarClock"
            },

            pianoGuitar: {
                type: "colin.lou.synths.pianoGuitar"
            }
        }
    });


    fluid.defaults("colin.lou.synths.clock", {
        gradeNames: "flock.synth",

        bpm: 104
    });

    fluid.defaults("colin.lou.synths.clock.motion", {
        gradeNames: "colin.lou.synths.clock",

        synthDef: {
            ugen: "flock.ugen.out",
            expand: 1,
            sources: {
                ugen: "flock.ugen.impulse",
                rate: "audio",
                freq: {
                    rate: "audio",
                    ugen: "colin.lou.ugen.pulseToFreq",
                    bpm: "{that}.options.bpm",
                    pulse: {
                        rate: "audio",
                        ugen: "flock.ugen.lag",
                        time: 10,
                        source: {
                            rate: "audio",
                            ugen: "colin.lou.ugen.quantize",
                            steps: 4,
                            source: {
                                id: "motion",
                                ugen: "flock.ugen.value",
                                rate: "control",
                                value: 0,
                                mul: 3
                            },
                            mul: 0.5,
                            add: 1.0
                        }
                    }
                }
            }
        }
    });

    fluid.defaults("colin.lou.synths.clock.static", {
        gradeNames: "colin.lou.synths.clock",

        synthDef: {
            ugen: "flock.ugen.out",
            expand: 1,
            sources: {
                ugen: "flock.ugen.impulse",
                rate: "control",
                freq: {
                    expander: {
                        funcName: "colin.lou.synths.convertBeatsToFreq",
                        args: ["{that}.options.pulse", "{that}.options.bpm"]
                    }
                }
            }
        }
    });


    fluid.defaults("colin.lou.synths.pianoClock", {
        gradeNames: ["colin.lou.synths.clock.static", "colin.lou.synths.halfSpeedClock"],

        bpm: 52,
        pulse: 1.25,

        synthDef: {
            bus: "{interconnects}.options.pianoClockBus"
        }
    });

    fluid.defaults("colin.lou.synths.guitarClock", {
        gradeNames: ["colin.lou.synths.clock.static", "colin.lou.synths.halfSpeedClock"],

        bpm: 52,
        pulse: 1.5,

        synthDef: {
            bus: "{interconnects}.options.guitarClockBus"
        }
    });

    fluid.defaults("colin.lou.synths.drumClock", {
        gradeNames: ["colin.lou.synths.clock.motion", "flock.modelSynth"],

        pulse: 1,

        synthDef: {
            bus: "{interconnects}.options.drumClockBus"
        },

        model: {
            inputs: {
                motion: {
                    value: "{motionResponder}.model.leftMotion"
                }
            }
        }
    });

    fluid.defaults("colin.lou.synths.drumBass", {
        gradeNames: "flock.modelSynth",

        synthDef: [
            // Drum
            {
                ugen: "flock.ugen.playBuffer",
                loop: 1.0,
                mul: 0.5,
                trigger: {
                    id: "drumTrigger",
                    ugen: "flock.ugen.in",
                    bus: "{interconnects}.options.drumClockBus"
                },
                buffer: {
                    id: "tom",
                    url: "../audio/44100/tom-44100.wav"
                }
            },

            // Bass
            {
                ugen: "flock.ugen.sin",
                freq: {
                    ugen: "flock.ugen.math",
                    rate: "audio",
                    source: (146 * (2 / 3)) / 2,
                    mul: {
                        ugen: "flock.ugen.lag",
                        rate: "audio",
                        time: 10,
                        source: {
                            id: "motion",
                            ugen: "flock.ugen.value",
                            rate: "audio",
                            value: 0,
                            mul: 0.75,
                            add: 1.0
                        }
                    }
                },
                mul: 0.75
            },
        ],

        model: {
            inputs: {
                motion: {
                    value: "{motionResponder}.model.rightMotion"
                }
            }
        }
    });

    fluid.defaults("colin.lou.synths.pianoGuitar", {
        gradeNames: "flock.modelSynth",

        synthDef: [
            // Piano
            {
                ugen: "flock.ugen.playBuffer",
                loop: 1.0,
                mul: 0.25,
                start: {
                    ugen: "colin.lou.ugen.quantize",
                    steps: 2,
                    source: {
                        id: "pianoStart",
                        ugen: "flock.ugen.value",
                        rate: "control",
                        value: 0,
                        mul: 2
                    }
                },
                end: {
                    ugen: "colin.lou.ugen.quantize",
                    steps: 2,
                    source: {
                        ugen: "flock.ugen.latch",
                        trigger: {
                            ugen: "flock.ugen.in",
                            bus: "{interconnects}.options.pianoClockBus"
                        },
                        source: {
                            id: "pianoEnd",
                            ugen: "flock.ugen.value",
                            rate: "control",
                            value: 0,
                            mul: 2
                        }
                    },
                    add: 0.5
                },
                trigger: {
                    id: "pianoTrigger",
                    ugen: "flock.ugen.in",
                    bus: "{interconnects}.options.pianoClockBus"
                },
                buffer: {
                    id: "dsharp-piano",
                    url: "../audio/44100/piano-combined-44100.wav"
                }
            },

            // Guitar
            {
                ugen: "flock.ugen.playBuffer",
                loop: 1.0,
                mul: 0.5,
                start: {
                    ugen: "colin.lou.ugen.quantize",
                    steps: 2,
                    source: {
                        id: "guitarStart",
                        ugen: "flock.ugen.value",
                        rate: "control",
                        value: 0,
                        mul: 2
                    }
                },
                end: {
                    ugen: "colin.lou.ugen.quantize",
                    steps: 2,
                    source: {
                        ugen: "flock.ugen.latch",
                        trigger: {
                            ugen: "flock.ugen.in",
                            bus: "{interconnects}.options.guitarClockBus"
                        },
                        source: {
                            id: "guitarEnd",
                            ugen: "flock.ugen.value",
                            rate: "control",
                            value: 0,
                            mul: 2
                        }
                    },
                    add: 0.5
                },
                trigger: {
                    id: "guitarTrigger",
                    ugen: "flock.ugen.in",
                    bus: "{interconnects}.options.guitarClockBus"
                },
                buffer: {
                    id: "csharp-guitar",
                    url: "../audio/44100/guitar-combined-44100.wav"
                }
            }
        ],

        model: {
            inputs: {
                pianoStart: {
                    value: "{motionResponder}.model.leftMotion"
                },
                pianoEnd: {
                    value: "{motionResponder}.model.leftMotion"
                },
                guitarStart: {
                    value: "{motionResponder}.model.rightMotion"
                },
                guitarEnd: {
                    value: "{motionResponder}.model.rightMotion"
                }
            }
        }
    });

    colin.lou.synths.convertBeatsToFreq = function (beats, bpm) {
        return (bpm / beats) / 60;
    };
}());
