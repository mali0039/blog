const User = require('../models/user');
const Post = require('../models/post');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken')
require("dotenv").config()

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
    passport.authenticate('local'),
        function (req, res, user) {
            jwt.sign({user}, process.env.secret, (err, token) => {
                if (err) {
                    res.status(401).json({message: "Failed creating JWT"});
                }
                res.json({token, message: "Saved token."})
            })
            res.status(200).json({user: user.username, message: "User logged in."})
        }
}

exports.user_logout_post = function (req, res) {
    req.logout();
    res.status(205).json({message: "User logged out."})
};



