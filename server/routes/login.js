const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../Config/passportConfig')(passport);

router.post('/', passport.authenticate('local'), (req, res) => {
    console.log(req.user);
    req.session.save();
    res.send("Login Successful");
});

module.exports = router;