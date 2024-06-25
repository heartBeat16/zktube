const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
    // URL: {
    //     type: String,
    //     required: true,
    // }
    videoId: {
        type: String,
        required: true,
    }
})

const Link = mongoose.model('Link', LinkSchema)
module.exports = Link