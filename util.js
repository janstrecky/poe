/* A list of 1,000,000 ids with a length of 5 gives ~500 duplicates
 * making them 6 chars long gives ~0-3 duplicates
 *
 * 10,000,000 ids with a length of 5 gives ~75,000 duplicates
 * length of 6 gives ~75 duplicates
 * ====================== */
exports.randomID = function(prefix, len) {
    len = len || 6;
    var s = prefix || "";
    var preLen = 0; if (prefix) preLen = prefix.length;
    var randomChar = function() {
        var n = Math.floor(Math.random() * 62);
        if (n < 10) return n; // 1-10
        if (n < 36) return String.fromCharCode(n + 55); // A-Z
        return String.fromCharCode(n + 61); // a-z
    };
    while (s.length < (len + preLen)) s += randomChar();
    return s;
};