const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const db = require("./db/db.js");
const cookieSession = require("cookie-session");
const bc = require("./conf/bcrypt.js");

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

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/registration", (req, res) => {
    console.log(req.body);
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
                        console.log(registeredUser);
                        req.session.id = registeredUser.id;
                        res.json({
                            success: true,
                            user: registeredUser
                        });
                    });
            })
            .catch(err => {
                console.log(err);
                res.json({
                    error: "The email address already exists."
                });
            });
    }
});

app.get("/welcome", function(req, res) {
    if (req.session.id) {
        redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
app.get("*", signedOutRedirect, function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 8080);
