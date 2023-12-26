const express = require('express')
const router = express.Router()


router.route("/")
    .get((req, res) => {
        res.redirect("/users/qsns.html")
    })
    .post((req, res) => {
        const testType = req.body.testType
        const levelType = req.body.levelType
        console.log(testType, levelType);
        res.status(200).json({ status: true, redirect: "/users/qsns.html" })
    })

module.exports = router