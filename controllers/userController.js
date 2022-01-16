const User = require('../models/user');
const Post = require('../models/post');
const passport = require("passport");
const bcrypt = require('bcryptjs')
const LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken')
require("dotenv").config()

const secret = process.env.secret
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                console.log("WOW")
                if (res) {
                    // passwords match! log user in
                    return done(null, user)

                } else {
                    // passwords do not match!

                    return done(null, false, { message: "Incorrect password" })
                }
            })
        });
    })
);


exports.user_create_post = function (req, res) {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return next(err)
        if (user) {
            res.status(303).json({ message: "User already exists" })
        }
        else {
            console.log(req)
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                // if err, do something
                if (err)
                    return console.log(err)
                // otherwise, store hashedPassword in DB
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    fullName: req.body.fName + " " + req.body.lName,
                    firstName: req.body.fName,
                    lastName: req.body.lName,
                    isAuthor: false
                }).save(err => {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json({ message: "User successfully created." })
                });
            });
        }
    })
};

exports.user_login_post = function (req, res) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            jwt.sign(user.toJSON(), process.env.secret, (err, token) => {
                if (err) {
                    console.log(err)
                    return res.status(401).json({ message: "Failed creating JWT" });
                }
                return res.status(200).json({ user: user.username, token, message: "Saved token. User logged in." })
            })
        });
    })(req, res);
}

exports.user_logout_post = function (req, res) {
    res.status(205).json({ message: "User logged out." })
};



