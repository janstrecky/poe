var chai   = require("chai"),
    // expect = chai.expect,
    should = chai.should();

describe("Foo", function() {
    it("should do stuff", function() {
        var foo = "heyo";
        foo.should.be.a("string");
        foo.should.equal("heyo");
        foo.should.have.length(4);
    });
});

describe("Array", function() {
    describe("#indexOf()", function() {
        it("should return -1 when the value is not present", function() {
            [1, 2, 3].indexOf(5).should.be.equal(-1);
            [1, 2, 3].indexOf(0).should.be.equal(-1);
        });

        it("should return -1 when the value is not present 2", function() {
            [1, 2, 3].indexOf(5).should.be.equal(-1);
            [1, 2, 3].indexOf(0).should.be.equal(-1);
        });
    });
});
