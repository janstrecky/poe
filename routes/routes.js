
/* Index Route
 * ====================== */
exports.index = function(req, res) {
    res.render("index", { title: "Home" });
};


/* Prefix Mods Route
 * ====================== */
exports.mods_prefix = function(req, res) {
    res.render("mods-prefix", { title: "Prefix Mods" });
};


/* Suffix Mods Route
 * ====================== */
exports.mods_suffix = function(req, res) {
    res.render("mods-suffix", { title: "Suffix Mods" });
};


/* Jewelry items Route
 * ====================== */
exports.items_jewelry = function(req, res) {
    res.render("items-jewelry", { title: "Jewelry" });
};

/* Weapon items Route
 * ====================== */
exports.items_weapon = function(req, res) {
    res.render("items-weapon", { title: "Weapons" });
};

/* Armour items Route
 * ====================== */
exports.items_armour = function(req, res) {
    res.render("items-armour", { title: "Armour" });
};

/* Currency items Route
 * ====================== */
exports.items_currency = function(req, res) {
    res.render("items-currency", { title: "Currency" });
};


/* 404 Route
 * ====================== */
exports._404 = function(req, res) {
    res.status(404);
    res.render("404", {
        title: "404: File Not Found!"
    });
};


/* 500 Route
 * ====================== */
exports._500 = function(err, req, res, next) {
    res.status(500);
    res.render("500", {
        title: "500: Internal Server Error!",
        error: err
    });
};