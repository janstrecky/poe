var log = require("logule").init(module);
var GoogleSpreadsheet = require("google-spreadsheet");

var sheet = new GoogleSpreadsheet("0AotyQznBloPbdFBOb1RudlBBcEJkX3pyU1ZxaGJCa0E");

sheet.getRows(1, {
    num: 3
}, function(err, data) {
    if (err) throw err;
    data.forEach(function(row) {
        // Remove useless elements, change the value of prefixsuffix to boolean and rename it to prefix
        row.prefix = row.prefixsuffix = (row.prefixsuffix === "Prefix" ? true : false);
        ["content", "_xml", "id", "_links", "save", "del", "prefixsuffix"].forEach(function(e) { delete row[e]; });



        for (var key in row) {
            if (row.hasOwnProperty(key)) {
                if (row[key] === "Yes") row[key] = true;
                if (row[key] === "No") row[key] = false;
                if (typeof row[key] === "string" && row[key].match(/^\d+$/)) row[key] = parseInt(row[key], 10);
            }
        }

        log.info(row);
    });
});