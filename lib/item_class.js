function Armour(name, lvl, armour, evasion, es, reqStr, reqDex, reqInt, impMods, modValues) {
    if (Array.isArray(name)) {
        var args = name;
        this.name = args[0];
        this.lvl = args[1];
        this.armour = args[2];
        this.evasion = args[3];
        this.es = args[4];
        this.reqStr = args[5];
        this.reqDex = args[6];
        this.reqInt = args[7];

        this.impMods = args[8];
        this.modValues = args[9];
    } else {
        this.name = name;
        this.lvl = lvl;
        this.armour = armour;
        this.evasion = evasion;
        this.es = es;
        this.reqStr = reqStr;
        this.reqDex = reqDex;
        this.reqInt = reqInt;

        this.impMods = impMods;
        this.modValues = modValues;
    }
}

function Weapon(name, lvl, damage, speed, dps, reqStr, reqDex, reqInt, impMods, modValues) {
    if (Array.isArray(name)) {
        var args = name;
        this.name = args[0];
        this.lvl = args[1];
        this.damage = args[2];
        this.speed = args[3];
        this.dps = args[4];
        this.reqStr = args[5];
        this.reqDex = args[6];
        this.reqInt = args[7];

        this.impMods = args[8];
        this.modValues = args[9];
    } else {
        this.name = name;
        this.lvl = lvl;
        this.damage = damage;
        this.speed = speed;
        this.dps = dps;
        this.reqStr = reqStr;
        this.reqDex = reqDex;
        this.reqInt = reqInt;

        this.impMods = impMods || undefined;
        this.modValues = modValues || undefined;
    }
}

function Jewelry(name, lvl, impMods, modValues) {
    if (Array.isArray(name)) {
        var args = name;
        this.name = args[0];
        this.lvl = args[1];
        this.impMods = args[2];
        this.modValues = args[3];
    } else {
        this.name = name;
        this.lvl = lvl;
        this.impMods = impMods;
        this.modValues = modValues;
    }
}

exports.Armour = Armour;
exports.Weapon = Weapon;
exports.Jewelry = Jewelry;
