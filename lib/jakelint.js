"use strict";

var fs     = require("fs"),
    jshint = require("jshint").JSHINT;
    
function lintFile(filename, options, globals) {
    var source = fs.readFileSync(filename, "utf-8"),
        pass = jshint(source, options, globals);
        
        if (pass) {
            console.log("\u2714", filename);
        } else {
            console.log("\u2718", filename);
            for (var i = 0; i < jshint.errors.length; i++) {
                var error = jshint.errors[i];
                if (!error) continue;
                
                if (error.evidence) console.log(error.line + ": " + error.evidence.trim());
                console.log("    " + error.reason);
            }
        }
    return pass;
}

function lintFiles(files, options, globals) {
    var allPass = true;
    files.forEach(function(filename) {
        var pass = lintFile(filename, options, globals);
        allPass = allPass && pass;
    });
    return allPass;
}

exports.run = lintFiles;
