(function () {
    "use strict";

    // Monkey patch Infusion's invoker implementation.
    fluid.makeInvoker = function (that, invokerec, name) {
        invokerec = fluid.upgradePrimitiveFunc(invokerec); // shorthand case for direct function invokers (FLUID-4926)
        if (invokerec.args !== undefined && invokerec.args !== fluid.NO_VALUE && !fluid.isArrayable(invokerec.args)) {
            invokerec.args = fluid.makeArray(invokerec.args);
        }
        var func = fluid.recordToApplicable(invokerec, that);
        var invokePre = fluid.preExpand(invokerec.args);
        var localRecord = {
            arguments: []
        };
        var expandOptions = fluid.makeStackResolverOptions(that, localRecord, true);
        func = func || (invokerec.funcName? fluid.getGlobalValueNonComponent(invokerec.funcName, "an invoker") : fluid.expandImmediate(invokerec.func, that));
        if (!func || !func.apply) {
            fluid.fail("Error in invoker record: could not resolve members func, funcName or method to a function implementation - got " + func + " from ", invokerec);
        } else if (func === fluid.notImplemented) {
            fluid.fail("Error constructing component ", that, " - the invoker named " + name + " which was defined in grade " + invokerec.componentSource + " needs to be overridden with a concrete implementation");
        }
        return function invokeInvoker () {
            if (fluid.defeatLogging === false) {
                fluid.pushActivity("invokeInvoker", "invoking invoker with name %name and record %record from component %that", {name: name, record: invokerec, that: that});
            }
            var togo, finalArgs;
            localRecord.arguments.length = arguments.length;
            for (var i = 0; i < arguments.length; ++ i) {
                localRecord.arguments[i] = arguments[i];
            }
            if (invokerec.args === undefined || invokerec.args === fluid.NO_VALUE) {
                finalArgs = localRecord["arguments"];
            } else {
                fluid.expandImmediateImpl(invokePre, expandOptions);
                finalArgs = invokePre.source;
            }
            togo = func.apply(null, finalArgs);
            if (fluid.defeatLogging === false) {
                fluid.popActivity();
            }
            return togo;
        };
    };

    fluid.defaults("colin.lou.motionTracker", {
        gradeNames: "fisher.motionTracker",

        listeners: {
            onMotionUpdate: "colin.electron.ipcSend(motionUpdate, {arguments})"
        }
    });
}());
