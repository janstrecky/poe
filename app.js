/* Dependencies
   TODO:
    - Use CDN for bootstrap/bootswatch (done)
    - Add fixed headers to mod/item tables
    - Create a variable for the item template instead of Ajax get (done)
    - Don't log errors from express-error
    - Create a colophon? http://redd.it/1lj6dy
    - Fix default theme CDN

   Notes:
    - (100+percentIncrease) % of (base+plusIncrease) + 20%
    - Find package for error handling
        - barc/express-error (4-5)

 * ====================== */
var express     = require("express"),
    http        = require("http"),
    stylus      = require("stylus"),
    log         = require("logule").init(module),
    io          = require("socket.io"),

    conf        = require("./conf"),
    routes      = require("./routes/routes"),

    mods        = require("./lib/mods"),
    items       = require("./lib/items");

    require("colors");


var app = express();


/* Configuration
 * ====================== */
app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");

    // app.use(express.logger("dev")); // comment if too much spam

    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());

    // app.use(express.session({ secret: conf.session_secret })); this gives err 500

    // Set the local property 'url' to the current url. Used for navbar
    // Fix this so it doesn't fire for each request
    app.use(function(req, res, next) {
        if (req.url === "/") {
            res.locals.url = "index";
        } else {
            res.locals.url = req.url.replace(/\W/g, "");
        }
        var app_theme = req.cookies.app_theme || "cosmo";
        res.locals.app_theme = app_theme;

        return next();
    });

    app.locals = conf.locals;

    app.locals.mods = mods.mods;
    app.locals.prefixes = mods.prefixes;
    app.locals.suffixes = mods.suffixes;
    app.locals.weapons = items.weapons;
    app.locals.armour = items.armour;
    app.locals.jewelry = items.jewelry;
    app.locals.currency = items.currency;

    app.locals.all = {
        prefixes: mods.prefixes,
        suffixes: mods.suffixes,
        weapons:  items.weapons,
        armour:   items.armour,
        jewelry:  items.jewelry,
        currency: items.currency
    };

    app.use(app.router);

    app.use(stylus.middleware({
        src: __dirname + "/public/stylus",
        dest: __dirname + "/public/css/",
        compile: function(str, path) {
            return stylus(str)
                .set("filename", path)
                .set("compress", true);
        }
    }));

    app.use(express.static(__dirname + "/public"));

    app.use(require("express-error").express3({
        contextLinesCount: 3,
        handleUncaughtException: true,
        showStack: true,
        dumpExceptions: true,
        title: "I dun goofed.."
    }));
});


/* Routes
 * ====================== */
app.get("/", routes.index);
app.get("/mods/prefix", routes.mods_prefix);
app.get("/mods/suffix", routes.mods_suffix);

app.get("/items/weapon", routes.items_weapon);
app.get("/items/armour", routes.items_armour);
app.get("/items/armor", routes.items_armour); // use redirect?

app.get("/items/jewelry", routes.items_jewelry);
app.get("/items/currency", routes.items_currency);

app.get("/err", function(req, res) {
    app.wat();
});


/* Handle 404 and 500.
   This should be called after all other routes
 * ====================== */
app.use(routes._404);
// app.use(routes._500);


/* Create the server
 * ====================== */
var server = http.createServer(app);

exports.listen = function(callback) {
    server.listen(conf.PORT, conf.IP, callback);
};

exports.close = function(callback) {
    server.close(callback);
};

// io = io.listen(server);
/*io.sockets.on("connection", function(socket) {
    socket.on("img-request", function(data) {
        // log.info(data);

        var name = data.name,
            type = data.type;

        // log.info("req", items.armour[type]);

        var search = items.armour[type];

        for (var i = 0; i < search.length; i++) {
            if (search[i].name === name) {
                socket.emit("img-response", {
                    largeImg: search[i].largeImg,
                    smallImg: search[i].smallImg
                });
                break;
            }
        }
    });
});*/
