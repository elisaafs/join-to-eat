const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const db = require("./db/db.js");
const cookieSession = require("cookie-session");
const bc = require("./conf/bcrypt.js");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const config = require("./config");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(
    cookieSession({
        secret: `I'm always hungry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

const signedOutRedirect = (req, res, next) => {
    if (!req.session.id) {
        res.redirect("/welcome");
    } else {
        next();
    }
};

app.use(compression());

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
    app.use(
        "/bundle.js.map",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/registration", (req, res) => {
    let pass = "";
    if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.password
    ) {
        res.json({
            error: "Please, fill all the fields."
        });
    } else {
        bc.hashPassword(req.body.password)
            .then(hashedPassword => {
                pass = hashedPassword;
                return db
                    .registerUser(
                        req.body.firstName,
                        req.body.lastName,
                        req.body.email,
                        pass
                    )
                    .then(registeredUser => {
                        req.session.id = registeredUser.id;
                        res.json({
                            success: true,
                            user: registeredUser
                        });
                    });
            })
            .catch(err => {
                res.json({
                    error: "The email address already exists."
                });
            });
    }
});

app.get("/user", function(req, res) {
    db.getUserById(req.session.id)
        .then(data => res.json(data))
        .catch(err => {
            console.log("is not working", err);
            res.sendStatus(500);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    db.updateUserImage(req.session.id, config.s3Url + req.file.filename).then(
        imgUrl => {
            res.json({
                success: true,
                url: imgUrl
            });
        }
    );
});

app.post("/uploadcover", uploader.single("file"), s3.upload, function(
    req,
    res
) {
    db.updateCoverImage(req.session.id, config.s3Url + req.file.filename).then(
        imgCoverUrl => {
            res.json({
                success: true,
                coverUrl: imgCoverUrl
            });
        }
    );
});

app.get("/welcome", function(req, res) {
    if (req.session.id) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/login", function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({
            error: "Please, fill all the fields."
        });
    } else {
        db.getInfo(req.body.email).then(results => {
            if (results === undefined || results.length === 0) {
                res.json({
                    error: "Email or password incorrect"
                });
            } else {
                let hashedPassword = results.hashed_password;
                bc.checkPassword(req.body.password, hashedPassword).then(
                    checked => {
                        if (checked) {
                            req.session.id = results.id;
                            res.json({
                                success: true
                            });
                        } else {
                            res.json({
                                error: "Email or password incorrect"
                            });
                        }
                    }
                );
            }
        });
    }
});

app.post("/bio", (req, res) => {
    db.saveBio(req.session.id, req.body.bio).then(bio => {
        res.json({ bio });
    });
});

app.get("/bio", (req, res) => {
    db.getBioById(req.session.id).then(bio => {
        res.json(bio);
    });
});

app.get("/user/:id.json", function(req, res) {
    if (req.session && req.params && req.session.id == req.params.id) {
        res.json({
            redirect: "/"
        });
    } else {
        db.getUserById(req.params.id).then(data => {
            res.json({ data });
        });
    }
});

app.get("/friendships/:id", function(req, res) {
    db.getFriendshipStatus(req.session.id, req.params.id).then(results => {
        res.json({
            ...results
        });
    });
});

app.post("/friendships/pending/:id", function(req, res) {
    db.createBff(req.session.id, req.params.id).then(results => {
        res.json({
            success: true
        });
    });
});

app.post("/friendships/cancel/:id", function(req, res) {
    db.cancelBff(req.session.id, req.params.id).then(results => {
        res.json({
            success: true
        });
    });
});

app.post("/friendships/accept/:id", function(req, res) {
    db.acceptBff(req.session.id, req.params.id).then(results => {
        res.json({
            success: true
        });
    });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("*", signedOutRedirect, function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 8080);
