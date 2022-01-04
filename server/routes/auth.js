const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../Config/passportConfig')(passport);

router.get('/facebook', passport.authenticate('facebook', { authType: 'reauthenticate', scope: ['user_friends', 'manage_pages'] }));
router.get('/facebook/callback', passport.authenticate('facebook'));

router.get('/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function (req, res) { res.redirect('/'); });

router.get('/google', passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) { res.redirect('/'); });