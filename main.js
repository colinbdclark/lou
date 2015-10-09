var fluid = require("infusion");

fluid.require(__dirname + "/js/app/audio-window.js");
fluid.require(__dirname + "/js/app/tracker-window.js");
fluid.require(__dirname + "/js/app/lou.js");

var colin = fluid.registerNamespace("colin"),
    app = colin.lou.app();
