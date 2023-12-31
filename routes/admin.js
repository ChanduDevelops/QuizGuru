const path = require("path")
const express = require("express")
const bodyParser = require('body-parser');
const router = express.Router()

const bitsModel = require("../models/bits")

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// display admin page
router.get("/", (re, res) => {
    console.log(`admin login`)
    res.render("admin.html")
})

// upload data
router.post("/", (req, res) => {
    const bodyData = req.body
    // console.log((bodyData))

    bitsModel.create(bodyData)
        .then(() => {
            console.log(`Bits inserted by admin`)
            res.sendStatus(200)
        })
        .catch((err) => {
            if (err.code === 11000) {
                console.error("Duplicate key error. Data not inserted.")
                res.sendStatus(409)
            } else {
                console.error("Error", err)
                res.sendStatus(500)
            }
        })
})

module.exports = router