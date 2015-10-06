/*global flock*/
(function () {
    "use strict";

    fluid.registerNamespace("colin.lou.ugen");

    colin.lou.ugen.indexArray = function (inputs, output, options) {
        var that = flock.ugen(inputs, output, options);

        that.gen = function (numSamps) {
            var m = that.model,
                out = that.output,
                inputs = that.inputs,
                list = that.inputs.list,
                index = that.inputs.index.output,
                i,
                j,
                indexRounded;

            for (i = j = 0; i < numSamps; i++, j += m.strides.index) {
                indexRounded = Math.round(index[j]);
                indexRounded = indexRounded < 0 ? 0 : indexRounded > list.length ? list.length - 1 : indexRounded;
                out[i] = list[indexRounded];
            }

            that.mulAdd(numSamps);
        };

        that.onInputChanged();
        return that;
    };

    flock.ugenDefaults("colin.lou.ugen.indexArray", {
        rate: "control",
        inputs: {
            index: 0,
            list: []
        },
        ugenOptions: {
            strideInputs: ["index"],
            noExpand: ["list"]
        }
    });

    colin.lou.ugen.pulseToFreq = function (inputs, output, options) {
        var that = flock.ugen(inputs, output, options);

        that.gen = function (numSamps) {
            var m = that.model,
                out = that.output,
                inputs = that.inputs,
                bpm = inputs.bpm.output[0],
                pulse = inputs.pulse.output[0],
                value = m.value,
                i;

            if (bpm !== m.prevBPM || pulse !== m.prevPulse) {
                m.prevBPM = bpm;
                m.prevPulse = pulse;
                value = m.value = (bpm / pulse) / 60;
            }

            for (i = 0; i < numSamps; i++) {
                out[i] = value;
            }

            that.mulAdd(numSamps);
        };

        that.onInputChanged();
        return that;
    };

    flock.ugenDefaults("colin.lou.ugen.pulseToFreq", {
        rate: "control",
        inputs: {
            bpm: 60,
            pulse: 1
        },
        ugenOptions: {
            model: {
                prevBPM: 0,
                prevPulse: 0,
                value: 0
            }
        }
    });

    // Source values should be in the range of 0..1 (values lower or higher will be clipped to 0 or 1, respectively)
    colin.lou.ugen.quantize = function (inputs, output, options) {
        var that = flock.ugen(inputs, output, options);

        that.gen = function (numSamps) {
            var m = that.model,
                out = that.output,
                inputs = that.inputs,
                source = inputs.source.output,
                steps = inputs.steps.output[0],
                i,
                j,
                k;

            if (steps !== m.steps) {
                m.steps = steps;
                m.stepValue = steps > 0 ? 1.0 / steps : 0;
                m.halfStep = m.stepValue / 2;
            }

            for (i = j = 0; i < numSamps; i++, j += m.strides.source) {
                var val = source[j],
                    quantized = 1;

                if (val <= 0) {
                    quantized = 0;
                } else if (val >= 1.0){
                    quantized = 1.0;
                } else {
                    for (k = m.stepValue; k < m.steps; k += m.stepValue) {
                        if (val <= k) {
                            quantized = val < (k - m.halfStep) ? k - m.stepValue : k;
                            break;
                        }
                    }
                }

                out[i] = quantized;
            }

            that.mulAdd(numSamps);
        };

        that.onInputChanged();
        return that;
    };

    flock.ugenDefaults("colin.lou.ugen.quantize", {
        rate: "audio",
        inputs: {
            steps: 4,
            source: undefined
        },
        ugenOptions: {
            strideInputs: ["source"],
            model: {
                steps: 0,
                stepValue: 0
            }
        }
    });
}());
