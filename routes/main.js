const express = require('express')
const session = require("express-session")
const authenticateUser = require("../authenticate")
const router = express.Router()

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

router.route("/")
    .get((req, res) => {
        res.redirect("/main.html")
    })
    .post((req, res) => {
        req.session.testCategory = req.body.testCategory
        req.session.testLevel = req.body.testLevel
        // console.log("main", testCategory, testLevel)
        res.status(200).json({ status: true, redirect: "/users/qsns" })
    })


module.exports = { router }
