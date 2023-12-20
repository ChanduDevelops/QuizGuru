const express = require('express')
const router = express.Router()

router.route("/")
    .get((req, res) => {
        try {
            if (sessionStorage.getItem("user")) {
                res.status(200).json({ status: true, redirect: "/users/main.html" })
            }
            else {
                res.status(404).json({ status: false, redirect: "/users/login.html" })
            }
        }
        catch (err) {
            res.status(500).json({ status: false, redirect: "/users/login.html" })
        }
    })