var log = require("logule").init(module),
    items = require("./items");

var boots = items.armour["Boots"];
for (var i = 0; i < boots.length; i++) {
    log.info(boots[i].name);
}