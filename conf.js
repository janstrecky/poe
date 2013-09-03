module.exports = {
    PORT: process.env.PORT || 1234,
    IP  : process.env.IP,

    session_secret: "3sekrt5yu",

    // app.locals
    locals: {
        appName: "PoEItem",
        theme: "cyborg",
        author: "Morten Lindhardt",
        authorLink: "http://github.com/r3Fuze",
        themes: [
            "Amelia",
            "Cerulean",
            "Cosmo",
            "Cyborg",
            "Flatly",
            "Journal",
            "Readable",
            "Simplex",
            "Slate",
            "Spacelab",
            "United",
            "Default"
        ]
    },

    // Jake
    lint: {
        options: {
            "-W065": false, // parseInt radix
            bitwise: true,
            curly: false,
            eqeqeq: true,
            forin: true,
            immed: true,
            newcap: true,
            noarg: true,
            noempty: true,
            nonew: true,
            regexp: true,
            quotmark: "double",
            // undef: true,
            // strict: true,
            trailing: true,
            node: true
        },
        globals: {
            describe: false,
            it: false,
            beforeEach: false,
            afterEach: false
        }
    },
    mochaOptions: {
        ui: "bdd",
        reporter: "spec"
    }
};