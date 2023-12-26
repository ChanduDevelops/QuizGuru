const express = require('express')
const session = require("express-session")
const authenticateUser = require("../authenticate")
const router = express.Router()

let testType = null
let levelType = null

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

router.route("/")
    .get(authenticateUser, (req, res) => {
        console.log(req.session.user);
        res.redirect("/main.html")
    })
    .post((req, res) => {
        testType = req.body.testType
        levelType = req.body.levelType
        console.log(testType, levelType);
        res.status(200).redirect("/users/qsns.html")
    })

module.exports = { router, testType, levelType }
