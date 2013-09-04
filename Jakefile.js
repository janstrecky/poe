/* TODO:
    - Figure out how to remove 'undeclared variable' warning
 * ====================== */
var conf = require("./conf");


desc("Lint JavaScript files");
task("lint", function() {
    var lint = require("./lib/jakelint.js");

    var files = new jake.FileList();
    files.include("**/*.js");
    files.exclude(["node_modules", "public/libs", "lib/test.js"]);
    var pass = lint.run(files.toArray(), conf.lint.options, conf.lint.globals);
    if (!pass) fail("Lint failed");
    complete("All files linted!");
});

desc("Run tests with Mocha");
task("test", function() {
    var mocha = require("./lib/mocha-glob");
    var options = conf.mochaOptions;

    mocha.run("test/_*_test.js", options, function(err) {
        if (!err) return complete();
        fail(err);
    });
});

desc("Task description");
task("taskname", function() {

});

task("default", ["lint", "test"]);
