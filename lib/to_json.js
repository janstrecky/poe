var log   = require("logule").init(module),
    fs    = require("fs"),
    mods  = require("./mods"),
    items = require("./items");

var prefixes = mods.prefixes;
var suffixes = mods.suffixes;

var allMods = {
    prefix: prefixes,
    suffix: suffixes
};

fs.writeFile("data/mods.json", JSON.stringify(allMods, null, "    "), function(err) {
    if (err) throw err;
    log.info("file saved!");
});

fs.writeFile("data/weapons.json", JSON.stringify(items.weapons, null, "    "), function(err) {
    if (err) throw err;
    log.info("file saved!");
});

fs.writeFile("data/armour.json", JSON.stringify(items.armour, null, "    "), function(err) {
    if (err) throw err;
    log.info("file saved!");
});

fs.writeFile("data/jewelry.json", JSON.stringify(items.jewelry, null, "    "), function(err) {
    if (err) throw err;
    log.info("file saved!");
});

fs.writeFile("data/currency.json", JSON.stringify(items.currency, null, "    "), function(err) {
    if (err) throw err;
    log.info("file saved!");
});