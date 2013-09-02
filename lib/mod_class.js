var log = require("logule").init(module);

/*
    x1 / x2
    ---
    x to y
    ---
    x1 / x2 to y2
    ---
    x1 to y1 / x2 to y2
*/
var regex1 = /^[\-?\w+]{1,4} \/ [\-?\w+]{1,4}$/,                                     // no range, double value         type 1 (1 / 4)
    regex2 = /^[\-?\w+]{1,4} to [\-?\w]{1,4}$/,                                      // range, single value            type 2 (7 to 23)
    regex3 = /^[\-?\w+]{1,4} \/ [\-?\w+]{1,4} to [\-?\w+]{1,4}$/,                    // no range / range, double value type 3 (10 / 5 to 15)
    regex4 = /^[\-?\w+]{1,4} to [\-?\w+]{1,4} \/ [\-?\w+]{1,4} to [\-?\w+]{1,4}$/,   // range, double value            type 4 (1 to 4 / 5 to 19)
    regex5 = /^[\-?\w]{1,4}$/;                                                       // single value                   type 5 (1)


function Mod(name, lvl, stat, value) {
    if (Array.isArray(name)) {
        var args = name;
        this.name = args[0];
        this.lvl = parseInt(args[1], 10);
        this.stat = args[2];
        this.value = args[3];
    } else {
        this.name = name;
        this.lvl = parseInt(lvl, 10);
        this.stat = stat;
        this.value = value;
    }

    if (this.stat.indexOf("/") !== -1) {
        var statSpl = this.stat.split(" / ");
        this.stat1 = statSpl[0];
        this.stat2 = statSpl[1];
        this.multiStat = true;
    }

    this.suffix = this.name.indexOf("of ") === 0;
    this.multi = false;

    var valSp = this.value.replace(" ", ""),
        split = [];
    if(regex1.test(this.value)) { // type 1
        split = valSp.split("/");
        // set all min and max to value
        this.value1 = this.value1Min = this.value1Max = split[0].trim();
        this.value2 = this.value2Min = this.value2Max = split[1].trim();
        this.multi = true;
        this.type = 1;
    } else if (regex2.test(this.value)) { // type 2
        split = valSp.split("to");

        this.valueMin = split[0].trim();
        this.valueMax = split[1].trim();
        this.multi = false;
        this.type = 2;
    } else if (regex3.test(this.value)) { // type 3
        split = valSp.split("/");
        var split2 = split[1].split("to");

        this.value1 = this.value1Min = this.value1Max = split[0].trim();
        this.value2 = split[1].trim();
        this.value2Min = split2[0].trim();
        this.value2Max = split2[1].trim();
        this.multi = true;
        this.type = 3;
    } else if (regex4.test(this.value)) { // type 4
        // (1 to 4 / 5 to 19)
        split = this.value.split("/");
        var val1 = split[0].split("to");
        var val2 = split[1].split("to");

        this.value1 = split[0].trim(); // 1 to 4
        this.value2 = split[1].trim(); // 5 to 19

        this.value1Min = val1[0].trim();
        this.value1Max = val1[1].trim();
        this.value2Min = val2[0].trim();
        this.value2Max = val2[1].trim();
        this.multi = true;
        this.type = 4;
    } else if (regex5.test(this.value)) { // type 5
        this.valueMin = this.valueMax = this.value.trim();
        this.multi = false;
        this.type = 5;
    } else {
        log.error("DID NOT MATCH ANY", this.value);
        this.type = -1;
    }
}

exports.Mod = Mod;