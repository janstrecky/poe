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
    }
}

function Jewelry(name, lvl, impMods, modValues) {
    if (Array.isArray(name)) {
        var args = name;
        this.name = args[0];
        this.lvl = args[1];
        this.impMods = args[2];
        this.modValues = args[3];

        if (this.impMods.indexOf(" / ") !== -1) {
            var sp1 = this.impMods.split(" / ");
            var sp2 = this.modValues.split(" / ");
            this.multi = true;
            this.impMod1 = sp1[0];
            this.impMod2 = sp1[1];

            this.modValue1 = sp2[0];
            this.modValue2 = sp2[1];
        }
    }
}

function Currency(name, stackSize, description) {
    if (Array.isArray(name)) {
        var args = name;
        this.name = args[0];
        this.stackSize = args[1];
        this.description = args[2];
    }
}

exports.Armour = Armour;
exports.Weapon = Weapon;
exports.Jewelry = Jewelry;
exports.Currency = Currency;
