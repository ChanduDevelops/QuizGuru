const mongoose = require('mongoose')

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

module.exports = mongoose.model("bits", bitsSchema)
