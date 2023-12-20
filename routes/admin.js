const path = require("path")
const express = require("express")
const bodyParser = require('body-parser');
const router = express.Router()

const adminPath = path.join(__dirname, "../", "public/admin.html")

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on("error", err => console.error(err))
db.once("open", () => console.log("Connected to mongoose!"))

const bitsSchema = new mongoose.Schema({
    category: String,
    level: String,
    qsn: { type: String, unique: true },
    a: String,
    b: String,
    c: String,
    d: String,
    ans: String
})
const bitsModel = mongoose.model("bits", bitsSchema)

// display admin page
router.get("/", (re, res) => {
    res.sendFile(adminPath)
})

// upload data
router.post("/", (req, res) => {
    const bodyData = req.body
    // console.log((bodyData))

    bitsModel.create(bodyData)
        .then(() => {
            console.log(`Data inserted`)
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

    // bitsModel.insertMany([bodyData])
    //     .then((result) => {
    //         if (result && result.length > 0) {
    //             console.log(`Data inserted`)
    //             res.sendStatus(200)
    //         }
    //         else {
    //             console.error(`Data not inserted`);
    //             res.sendStatus(500)
    //         }
    //     })
    //     .catch((err) => {
    //         console.error("Error", err)
    //         res.sendStatus(500)
    //     })
})

module.exports = router