const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    console.log("Logged out");
    req.logout();
});

module.exports = router;