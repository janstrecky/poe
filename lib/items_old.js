var ItemClass = require("./item_class"),
    Weapon = ItemClass.Weapon,
    Armour = ItemClass.Armour,
    Jewelry = ItemClass.Jewelry;

var log = require("logule").init(module);
var fs = require("fs");
var request = require("request");

var jewelry = [],
    armour = [],
    weapon = [];

function readItem(url, arr, Cl, cb) {
    request("http://www.pathofexile.com/item-data/" + url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            log.info("got response!");
            var i = body.indexOf("<div id=\"mainContainer\">");
            var i2 = body.indexOf("</div><!-- mainContainer -->");

            var s = body.slice(i, i2);
            var items = s.split(/<tr>|<tr class=\"even\">/);

            items.shift();
            items.shift();

            items.filter(function(e) { return e; });

            items.forEach(function(str) {
                str = replaceAll("\t", "", str);
                str = stripHTML(str);
                lines = str.split("\n");

                lines = lines.filter(function(e) { return e; });
                var it = new Cl(lines);
                if (it.name !== "Name") arr.push(it);
            });
            cb(arr);
        } else {
            log.info(error);
        }
    });
}

function readJewelry(cb) {
    readItem("jewelry", jewelry, Jewelry, cb);
}

function readArmour(cb) {
    readItem("armour", armour, Armour, cb);
}

exports.readJewelry = readJewelry;
exports.readArmour = readArmour;

function read() {
    request("http://www.pathofexile.com/item-data/jewelry", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            log.info("got response!");
            var i = body.indexOf("<div id=\"mainContainer\">");
            var i2 = body.indexOf("</div><!-- mainContainer -->");

            var s = body.slice(i, i2);
            var cats = s.split("<div class=\"layoutBox1 layoutBoxFull defaultTheme\">");

            cats.forEach(function(items) {
                var arr = items.split(/<\/tr>/);
            });
        }
    });
}

read();

function stripHTML(html) {
    return html.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, "");
}

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, "g"), replace);
}