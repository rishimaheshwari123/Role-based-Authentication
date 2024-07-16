const mongoose = require("mongoose")
const comment = require("./comment")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    images: [
        {
            public_id: String,
            url: String,
        },
    ],
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]

})

module.exports = mongoose.model("Post", postSchema)