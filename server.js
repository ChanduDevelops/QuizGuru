if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const path = require("path")
const port = process.env.PORT ?? 6969

const usersRouter = require("./routes/users")
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

app.use("/users", usersRouter)

app.get("/", (req, res) => {
    res.redirect("/index.html")
})

app.use(express.static("public"))

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log(`server listening at http://127.0.0.1:${port}`);
    }
})