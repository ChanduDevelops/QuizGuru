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
})

const usersModel = mongoose.model("users", usersSchema)

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

module.exports = { bitsModel, usersModel }