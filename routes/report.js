const express = require('express')
const router = express.Router()

var [correctAnswerCount, wrongAnswerCount, unattemptedCount] = [0, 0, 20]

router.route("/")
    .get((req, res) => {
        var [correctAnswerCount, wrongAnswerCount, unattemptedCount] = [req.session.correctAnswerCount, req.session.wrongAnswerCount, req.session.unattemptedCount]

        res.status(200).json({
            status: true,
            correctAnswerCount: correctAnswerCount,
            wrongAnswerCount: wrongAnswerCount,
            unattemptedCount: unattemptedCount,
            redirect: "/users/report.html"
        })
    })
    .post((req, res) => {
        req.session.correctAnswerCount = req.body?.correctAnswerCount
        req.session.wrongAnswerCount = req.body?.wrongAnswerCount
        req.session.unattemptedCount = req.body?.unattemptedCount
        res.sendStatus(200)
    })

module.exports = router