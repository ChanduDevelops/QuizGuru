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
        res.redirect("/users/main.html")
    })
    .post((req, res) => {
        req.session.testCategory = req.body.testCategory
        req.session.testLevel = req.body.testLevel
        res.status(200).json({ status: true, redirect: "/users/qsns" })
    })


function authenticate(re, res, next) {
    if (req.session?.user && req.query?.isValidated) {
        next()
    }
    else {
        res.redirect("/users/login")
    }
}

module.exports = { router }
