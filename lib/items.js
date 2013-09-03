var log = require("logule").init(module),
    fs  = require("fs"),

    Weapon   = require("./item_class").Weapon,
    Armour   = require("./item_class").Armour,
    Jewelry  = require("./item_class").Jewelry,
    Currency = require("./item_class").Currency;

    require("./fextend").init();



function read(folder, Cl) {
    var items = {};
    var files = fs.readdirSync("data/" + folder);
    files.forEach(function(filename) {
        if (filename.indexOf("_") === 0) return;

        var file = fs.readFileSync("data/" + folder + "/" + filename).toString();
        var split = file.split(/<tr>|<tr class=\"even\">/);

        split.forEach(function(part) {
            var orig = part;
            part = part.replace(/<br \/>(?!<)/g, " / ");
            part = part.replaceAll("    ", "");
            part = part.replaceAll("\t", "");
            part = part.replaceAll("\r", "");
            part = part.stripHTML();

            // create the array
            var strArr = part.split("\n");

            // remove all empty elements. first and last are always empty
            strArr = strArr.clean();

            // handle items without imp mods

            if (strArr.length === 0) { return; }

            var wep = new Cl(strArr);
            if (wep.name !== undefined) {
                wep.type = filename.replace(".html", "");

                if (strArr.length === 8) {
                    wep.impMods = undefined;
                    wep.modValues = undefined;
                }

                // dont input the images for now.. too much text
                var m1 = orig.match(/src=\"(.*?)\"/);
                var m2 = orig.match(/data-large-image=\"(.*?)\"/);

                if (m1 !== null && m2 !== null) {
                    wep.smallImg = m1[1];
                    wep.largeImg = m2[1];
                }

                items[wep.type] = items[wep.type] || [];
                items[wep.type].push(wep);
            }
        });
    });
    return items;
}

function readJSON(folder) {
    var all = fs.readFileSync("data/" + folder + ".json").toString();
    var allJson = JSON.parse(all);

    return allJson;
}

// exports.weapons = read("weapons", Weapon); // load from html files
// exports.armour = read("armour", Armour);


exports.weapons = readJSON("weapons", Weapon);
exports.armour = readJSON("armour", Armour);
exports.jewelry = readJSON("jewelry", Jewelry);
exports.currency = readJSON("currency", Currency);
