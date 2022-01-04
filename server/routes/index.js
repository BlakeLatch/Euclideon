const express = require('express');
const router = express.Router();

router.use('/login', require('./login.js'));
// router.use('/auth', require('./auth.js'));
router.use('/register', require('./register.js'));
router.use('/logout', require('./logout.js'));

module.exports = router;