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
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

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

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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

function updateProfileInternal(newUserData, req, res) {
    db.editUser(
        newUserData.firstName,
        newUserData.lastName,
        newUserData.email,
        newUserData.hashedPassword,
        newUserData.city,
        newUserData.food,
        newUserData.chef,
        newUserData.bio,
        req.session.id
    ).then(() => {
        res.json({
            redirect: "/"
        });
    });
}

app.post("/profile/edit", (req, res) => {
    db.getCompleteUserById(req.session.id).then(userData => {
        const newUserData = {
            firstName: req.body.firstName || userData.first_name,
            lastName: req.body.lastName || userData.last_name,
            email: req.body.email || userData.email,
            hashedPassword: userData.hashed_password,
            city: req.body.city || userData.city,
            food: req.body.food || userData.food,
            chef: req.body.chef || userData.chef,
            bio: req.body.bio || userData.bio
        };
        if (req.body.password != "") {
            bc.hashPassword(req.body.password).then(hashedPassword => {
                newUserData.hashedPassword = hashedPassword;
                updateProfileInternal(newUserData, req, res);
            });
        } else {
            updateProfileInternal(newUserData, req, res);
        }
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

app.get("/otheruser/:userId", function(req, res) {
    db.getUserById(req.params.userId).then(data => {
        res.json(data);
    });
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

app.get("/wannabe-friends", function(req, res) {
    db.listOfFriends(req.session.id).then(results => {
        res.json({ results });
    });
});

app.get("/friends/:id", function(req, res) {
    db.friendsOfFriends(req.params.id).then(results => {
        res.json({ results });
    });
});

app.get("/comments/:userId", (req, res) => {
    db.getCommentsByUserId(req.params.userId)
        .then(comments => {
            res.json(comments);
        })
        .catch(err => console.log(err));
});

app.post("/comment", (req, res) => {
    db.addComment(req.body.userId, req.session.id, req.body.comment)
        .then(result => {
            res.json({
                success: true,
                comment: result
            });
        })
        .catch(err => console.log(err));
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("*", signedOutRedirect, function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

let connectedSockets = [];
let chatMessages = [];

io.on("connection", function(socket) {
    if (!socket.request.session || !socket.request.session.id) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.id;

    connectedSockets.push({ socketId: socket.id, userId: userId });

    let onlineUsers = connectedSockets.map(elem => {
        return elem.userId;
    });

    db.getUsersByIds(onlineUsers).then(results => {
        socket.emit("onlineUsers", results);
    });

    const wasAlreadyHere =
        connectedSockets.filter(s => s.userId == userId).length > 1;

    if (!wasAlreadyHere) {
        db.joinById(userId).then(results => {
            socket.broadcast.emit("userJoined", results);
        });
    }

    socket.on("disconnect", function() {
        connectedSockets = connectedSockets.filter(
            entry => entry.socketId !== socket.id
        );
        const remainingSocketsForUser = connectedSockets.filter(
            entry => entry.userId === userId
        );
        if (remainingSocketsForUser.length === 0) {
            db.joinById(userId).then(results => {
                socket.broadcast.emit("userLeft", results);
            });
        }
    });

    socket.emit("recentMessages", chatMessages);

    socket.on("chatMessage", async function(newMessage) {
        const user = await db.getUserById(socket.request.session.id);
        let completeNewMessage = {
            user,
            content: newMessage,
            date: new Date()
        };
        chatMessages = [...chatMessages, completeNewMessage];
        if (chatMessages.length > 10) {
            chatMessages.shift();
        }
        io.sockets.emit("newMessage", completeNewMessage);
    });
});

server.listen(8080);
