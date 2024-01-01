const express = require('express')
const session = require("express-session")
const router = express.Router()

const bitsModel = require("../models/bits")

const getBitPack = (testCategory, testLevel) => {
    return bitsModel.find({
        category: testCategory,
        level: testLevel
    }).then(result => {
        if (result && result.length > 0) {
            return result
        } else {
            return null
        }
    }).catch(e => {
        console.error("cannot get bitpack")
    })
}

router.route("/")
    .get((req, res) => {
        console.log("query", req.query);
        if (req.query?.testCategory && req.query?.testLevel) {
            console.log("if");
            res.redirect(`/users/qsns.html?testCategory=${req.query.testCategory}&testLevel=${req.query.testLevel}`)
        }
        else if (req?.session?.testCategory && req?.session?.testLevel) {
            console.log("else if");
            res.redirect(`/users/qsns.html?testCategory=${req.session.testCategory}&testLevel=${req.session.testLevel}`)
        } else {
            console.log("else");
            res.redirect("/users/main")
        }
    })
    .post((req, res) => {
        if (req.body?.testCategory && req.body?.testLevel) {
            getBitPack(req.body?.testCategory, req.body?.testLevel)
                .then(bitPack => {
                    if (bitPack === null) {
                        res.status(404).json({ status: false, redirect: "/users/main" })
                    } else {
                        res.status(200).json({ status: true, bitPack: bitPack, redirect: "/users/qsns.html" })
                    }
                })
        } else {
            console.log("post else");
            res.redirect("/users/main")
        }
    })

module.exports = router