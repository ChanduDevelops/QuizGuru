const express = require('express')
const session = require("express-session")
const router = express.Router()


const authenticateUser = (req, res, next) => {
    if (req.session && req.session.user) {
        next()
    } else {
        res.redirect("/users/login.html")
    }
}

module.exports = authenticateUser