var Mod = require("./mod_class").Mod;

var log = require("logule").init(module);
var fs = require("fs");

require("./fextend").init();

var mods = {},
    preArr = {},
    sufArr = {};

function readMods(folder, arr) {
    var files = fs.readdirSync("data/" + folder);
    files.forEach(function(filename) {
        // ignore files starting with _
        if (filename.indexOf("_") === 0) return;

        var allSplit = fs.readFileSync("data/" + folder + "/" + filename).toString().split("<\/tr>");
        allSplit = allSplit.filter(function(e) { return e; });

        // remove the html extension
        filename = filename.replace(".html", "");

        allSplit.forEach(function(str) {
            // replace stuff so it's one value on each line
            str = str.replaceAll("<br />", " / ");
            str = str.replaceAll("    ", "");
            str = str.replaceAll("\t", "");
            str = str.replaceAll("\r", "");
            str = str.stripHTML();

            // create the array
            var strArr = str.split("\n");

            // remove all empty elements. first and last are always empty
            strArr = strArr.filter(function(e) { return e; });

            // create the node if it doesn't exist. add to it if it does
            arr[filename] = arr[filename] || [];

            // push the mods
            arr[filename].push(new Mod(strArr));
        });
    });
    return arr;
}

function readFromJSON(type, arr) {
    var all = fs.readFileSync("data/mods.json").toString();
    var allJson = JSON.parse(all);

    return allJson[type];
}


// exports.mods = mods;
// exports.prefixes = readMods("prefix", preArr);
// exports.suffixes = readMods("suffix", sufArr);

exports.prefixes = readFromJSON("prefix");
exports.suffixes = readFromJSON("suffix");