const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const MongoConnect = require("../Config/mongoConnect");
const userDetails = require('../Models/userSchema');

router.post('/',
    [
        check('fName').notEmpty().withMessage("First name is required"),
        check('lName').notEmpty().withMessage("Last name is required"),
        check('email').isEmail().withMessage("Must be a valid email address"),
        check('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
        check('role').isLength({ min: 1 }).withMessage("Role is required")
    ], (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const hashPass = bcrypt.hashSync(req.body.password, 10);

        const newUser = userDetails(
            {
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                password: hashPass,
                role: req.body.role
            }
        );

        bcrypt.compare(req.body.confirmPass, hashPass, function (err, matches) {
            if (!matches) {
                console.log("Passwords do not match");
                res.send("Passwords do not match");
            }
            else {
                newUser.save();
                console.log("Account Registered");
                res.send("Account Registered");
            }
        });
        
});

module.exports = router;