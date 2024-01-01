const express = require('express')
const router = express.Router()

var [correctAnswerCount, wrongAnswerCount, unattemptedCount] = [0, 0, 20]

router.route("/")
    .get((req, res) => {
        res.status(200).json({
            status: true,
            correctAnswerCount: correctAnswerCount,
            wrongAnswerCount: wrongAnswerCount,
            unattemptedCount: unattemptedCount,
            redirect: "/users/report.html"
        })
    })
    .post((req, res) => {
        correctAnswerCount = req.body?.correctAnswerCount
        wrongAnswerCount = req.body?.wrongAnswerCount
        unattemptedCount = req.body?.unattemptedCount
        res.sendStatus(200)
    })

module.exports = router