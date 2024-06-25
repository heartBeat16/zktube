const mongoose = require("mongoose");

const IPSchema = new mongoose.Schema({
    IP: String,
    Links: Array
})

const Ip = mongoose.model('IP', IPSchema)

module.exports = Ip