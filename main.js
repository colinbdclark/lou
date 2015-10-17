var fluid = require("infusion");

require("./js/app/audio-window.js");
require("./js/app/tracker-window.js");
require("./js/app/lou.js");

var colin = fluid.registerNamespace("colin");

colin.lou.app();
