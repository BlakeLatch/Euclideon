const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedinStrategy = require('passport-linkedin').Strategy;
const GoogleStrategy = require('passport-google').Strategy;
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const MongoConnect = require("./mongoConnect");
const userDetails = require('../Models/userSchema');


module.exports = function(passport)
{
    passport.serializeUser(function (user, done) {
        console.log("User serialised");    
            done(null, {
                id: user.id,
                email: user.email,
                role: user.role
            });
    });

    passport.deserializeUser(function (id, done) {
        userDetails.findOne(id, function (err, user) {
            if (err) {
                console.log(err);
                return done(null, err);
            }
            else
            {
            console.log("User deserialised");
            done(err, user);
            }
        });
    });

    passport.use(new LocalStrategy({ usernameField: 'email' },
        function (email, password, done) {
            const searchUser = userDetails.findOne({ email: email }, function (err, user) 
            {
                if (searchUser) {
                    if (bcrypt.compareSync(password, user.password)) {
                        console.log("Login Successful");
                        return done(null, user);
                    }
                    else {
                        console.log("Incorrect Password");
                        return done(null, false);
                    }
                }
                else {
                    console.log("Account not found");
                    return done(null, false);
                }
            });
        }
    ));

    // passport.use(new FacebookStrategy({
    //     clientID: process.env.FACEBOOK_APP_ID,
    //     clientSecret: process.env.FACEBOOK_APP_SECRET,
    //     // callbackURL: "http://localhost:3000/auth/facebook/callback",
    //     // passReqToCallback: true,
    //     // enableProof: true,
    //     // profileFields: ['id', 'displayName', 'email']
    // },
    // function(accessToken, refreshToken, profile, done)
    // {
    //     userDetails.findOne({ 'facebook.id': profile.id }, function (err, user) {
    //         if (err) {
    //             console.log(err);
    //             return done(null, err);
    //         }
    //         if (user) {
    //             console.log("User found");
    //             return done(null, user);
    //         }
    //         else {
    //             console.log("User not found");
    //             const newUser = new userDetails();
    //             newUser.facebook.id = profile.id;
    //             newUser.facebook.token = accessToken;
    //             newUser.facebook.name = profile.displayName;
    //             newUser.save(function (err) {
    //                 if (err) {
    //                     console.log(err);
    //                     return done(null, err);
    //                 }
    //                 else {
    //                     console.log("User created");
    //                     return done(null, newUser);
    //                 }
    //             });
    //         }
    //     });
    // }));

    // passport.use(new LinkedinStrategy({
    //     clientID: process.env.LINKEDIN_APP_ID,
    //     clientSecret: process.env.LINKEDIN_APP_SECRET,
    //     // callbackURL: "http://localhost:3000/auth/linkedin/callback",
    //     // passReqToCallback: true,
    //     // profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
    // },
    // function(accessToken, refreshToken, profile, done)
    // {
    //     userDetails.findOne({ 'linkedin.id': profile.id }, function (err, user) {
    //         if (err) {
    //             console.log(err);
    //             return done(null, err);
    //         }
    //         if (user) {
    //             console.log("User found");
    //             return done(null, user);
    //         }
    //         else {
    //             console.log("User not found");
    //             const newUser = new userDetails();
    //             newUser.linkedin.id = profile.id;
    //             newUser.linkedin.token = accessToken;
    //             newUser.linkedin.name = profile.displayName;
    //             newUser.save(function (err) {
    //                 if (err) {
    //                     console.log(err);
    //                     return done(null, err);
    //                 }
    //                 else {
    //                     console.log("User created");
    //                     return done(null, newUser);
    //                 }
    //             });
    //         }
    //     });
    // }));

    // passport.use(new GoogleStrategy({
    //     clientID: process.env.GOOGLE_APP_ID,
    //     clientSecret: process.env.GOOGLE_APP_SECRET,
    //     // callbackURL: "http://localhost:3000/auth/google/callback",
    //     // passReqToCallback: true
    // },
    // function(accessToken, refreshToken, profile, done)
    // {
    //     userDetails.findOne({ 'google.id': profile.id }, function (err, user) {
    //         if (err) {
    //             console.log(err);
    //             return done(null, err);
    //         }
    //         if (user) {
    //             console.log("User found");
    //             return done(null, user);
    //         }
    //         else {
    //             console.log("User not found");
    //             const newUser = new userDetails();
    //             newUser.google.id = profile.id;
    //             newUser.google.token = accessToken;
    //             newUser.google.name = profile.displayName;
    //             newUser.save(function (err) {
    //                 if (err) {
    //                     console.log(err);
    //                     return done(null, err);
    //                 }
    //                 else {
    //                     console.log("User created");
    //                     return done(null, newUser);
    //                 }
    //             });
    //         }
    //     });
    // }));
};