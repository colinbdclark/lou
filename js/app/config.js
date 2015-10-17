"use strict";

var path = require("path"),
    fluid = require("infusion"),
    colin = fluid.registerNamespace("colin");

fluid.defaults("colin.lou.config", {
    gradeNames: ["fluid.component", "fluid.resolveRootSingle"],
    singleRootType: "colin.lou.config"
});

colin.lou.config.getConfigPathArgument = function () {
    var args = process.argv.slice(2);
    return args.length > 0 ? args[0] : undefined;
};

colin.lou.config.loadConfigOptions = function (configName) {
    if (!configName) {
        configName = "default";
    }

    var firstSepIdx = configName.indexOf(path.sep),
        configPath;

    if (firstSepIdx === 0) {
        // Absolute path.
        // TODO: This will fail on Windows if the config is on a different volume.
        configPath = configName;
    } else {
        configPath = process.cwd();
        if (configName.indexOf(".json") < 0 && firstSepIdx < 0) {
            // We've got a plain config name.
            // Load the file from the default directory.
            configName += ".json";
            configPath += "/configs/";
        }
        configPath += configName;
    }

    console.log("Loading app configuration file from " + configPath);

    var options = require(configPath);
    return options;
};

var configPath = colin.lou.config.getConfigPathArgument(),
    configOptions = colin.lou.config.loadConfigOptions(configPath),
    config = colin.lou.config(configOptions);
