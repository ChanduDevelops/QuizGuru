if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const mongoose = require("mongoose")
mongoose.connect(
    process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

const db = mongoose.connection
db.on("error", err => console.error(err))
db.once("open", () => console.log("Connected to mongoose!"))

const express = require("express")
const app = express()
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
