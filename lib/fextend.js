exports.init = function() {
    String.prototype.stripHTML = function() {
        return this.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, "");
    };

    String.prototype.replaceAll = function(find, rep) {
        return this.replace(new RegExp(find, "g"), rep);
    };

    Array.prototype.clean = function() {
        return this.filter(function(e) { return e; });
    };
};