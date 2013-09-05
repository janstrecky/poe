var app  = require("./app"),
    conf = require("./conf"),
    log  = require("logule").init(module);

app.listen(function() {
    log.info("Express server listening on %s:%s", conf.IP, conf.PORT);
});