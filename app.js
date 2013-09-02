/* Dependencies
   TODO:
    - Use CDN for bootstrap/bootswatch?
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

    app.set("view options", { layout: false });
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

        next();
    });

    app.locals = conf.locals;

    app.locals.mods = mods.mods;
    app.locals.prefixes = mods.prefixes;
    app.locals.suffixes = mods.suffixes;
    app.locals.weapons = items.weapons;
    app.locals.armour = items.armour;

    app.locals.all = {
        prefixes: mods.prefixes,
        suffixes: mods.suffixes,
        weapons:  items.weapons,
        armour:   items.armour
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



/* Handle 404 and 500.
   This should be called after all other routes
 * ====================== */
app.use(routes._404);
app.use(routes._500);


/* Create the server
 * ====================== */
var server = http.createServer(app).listen(conf.PORT, conf.IP, function() {
    log.info("Express server listening on %s:%s", conf.IP, conf.PORT);
});

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
