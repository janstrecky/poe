/* jshint expr: true */

var chai   = require("chai"),
    expect = chai.expect,
    should = chai.should();

var request = require("superagent"),
    app     = require("../app");



describe("App", function() {

    before(function() {
        app.listen();
    });

    after(function() {
        app.close();
    });

    it("should be on the web", function(done) {
        this.timeout(5000);
        request.get("poe.fuzelol.c9.io", function(res) {

            expect(res).to.exist;
            expect(res.status).to.equal(200);

            done();
        });
    });
});