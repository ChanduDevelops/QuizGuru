const path = require("path")
const express = require("express")
const bodyParser = require('body-parser')
const router = express.Router()


const bcrypt = require("bcrypt")
const saltRounds = 10

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on("error", err => console.error(err))
db.once("open", () => console.log("Connected to mongoose!"))

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
});

const usersModel = mongoose.model("users", usersSchema);

const adminRouter = require("./admin")
router.use("/admin", adminRouter)

// login validation
const validateLogin = (userEmail, userPassword) => {
  console.log(userEmail, userPassword);
  return usersModel
    .find({ email: userEmail })
    .then((result) => {
      if (result && result.length > 0) {
        return result[0];
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
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
        console.log(userData);
        if (userData === null) {
          res.status(404).json({ success: false, redirect: "/users/login.html" })
        } else {
          bcrypt.compare(userPassword, userData.password, (err, result) => {
            if (err) {
              res.status(500).json({ success: false, redirect: "/users/login.html" })
            }
            else if (result) {
              res.status(200).json({ success: true, redirect: "/users/main.html" })
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
// need to check hashed password from db email and password individually



router.route("/signup")
  .get((req, res) => {
    res.redirect("/signup.html")
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


router.use(express.static("public"));

module.exports = router
