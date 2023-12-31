const express = require("express")
const bodyParser = require('body-parser')
const session = require("express-session")
const router = express.Router()


const bcrypt = require("bcrypt")
const saltRounds = 10

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

const usersModel = require("../models/users")

const adminRouter = require("./admin")
router.use("/admin", adminRouter)

const { router: mainRouter } = require("./main")
router.use("/main", mainRouter)

const adminMail = "admin@gmail.com"

const qsnsRouter = require("./qsns")
router.use("/qsns", qsnsRouter)

// login validation
const validateLogin = (userEmail, userPassword) => {
    return usersModel
        .find({ email: userEmail })
        .then(result => {
            if (result && result.length > 0) {
                return result[0];
            } else {
                return null;
            }
        })
        .catch(e => {
            console.error(e)
            throw e
        });
}

router.route("/login")
    .get((req, res) => {
        res.redirect("login.html")
    })
    .post((req, res) => {
        const bodyData = req.body
        const userEmail = bodyData.email;
        const userPassword = bodyData.password;
        validateLogin(userEmail, userPassword)
            .then((userData) => {
                if (userData === null) {
                    res.status(404).json({ success: false, msg: "not exists", redirect: "/users/login.html" })
                } else {
                    bcrypt.compare(userPassword, userData.password, (err, result) => {
                        if (err) {
                            res.status(500).json({ success: false, redirect: "/users/login.html" })
                        }
                        else if (result && userEmail === adminMail) {
                            res.status(200).json({ success: true, redirect: "/users/admin.html" })
                            console.log(`user : ${userEmail}`)
                            req.session.user = userEmail
                        }
                        else if (result) {
                            res.status(200).json({ success: true, redirect: "/users/main.html" })
                            console.log(`user : ${userEmail}`)
                            req.session.user = userEmail
                        }
                        else {
                            res.status(401).json({ success: false, msg: "wrong password", redirect: "/users/login.html" })
                        }
                    })
                }
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    })


router.route("/signup")
    .get((req, res) => {
        res.redirect("signup.html")
    })
    .post((req, res) => {
        const bodyData = req.body
        const username = bodyData.username
        const email = bodyData.email
        const password = bodyData.password
        bcrypt.hash(password, saltRounds, (err, hash) => {
            usersModel
                .create({ username, email, password: hash })
                .then(() => {
                    res.status(200).json({ success: true, redirect: "/users/login.html" })
                })
                .catch((err) => {
                    if (err.code === 11000) {
                        console.error("Duplicate key error. Data not inserted.");
                        res.status(409).json({ success: false, redirect: "/users/signup.html" })
                    } else {
                        console.error("Error", err)
                        res.status(500).json({ success: false, redirect: "/users/signup.html" })
                    }
                })
        })
    })

router.route("/forgot_pswd")
    .get((req, res) => {
        res.redirect("forgot_pswd.html")
    })
    .post((req, res) => {
        const bodyData = req.body
        const userEmail = bodyData.email
        const userPassword = bodyData.password

        validateLogin(userEmail, userPassword)
            .then((userData) => {
                if (userData === null) {
                    res.status(404).json({ success: false, msg: "not found", redirect: "/users/login.html" })
                }
                else {
                    bcrypt.hash(userPassword, saltRounds, (err, hash) => {
                        if (err) {
                            console.error("Error", err);
                            return res.status(500).json({ success: false, redirect: "/users/signup.html" })
                        }
                        usersModel.updateOne(
                            { email: userEmail },
                            {
                                $set: { password: hash }
                            }).then(() => {
                                res.status(200).json({ success: true, redirect: "/users/login.html" })
                            }).catch((err) => {
                                console.error("Error", err)
                                res.status(500).json({ success: false, redirect: "/users/signup.html" })
                            })
                    })
                }
            }).catch((err) => {
                console.error("Error", err)
                res.status(500).json({ success: false, redirect: "/users/signup.html" })
            })
    })


router.use(express.static("public"));

module.exports = router
