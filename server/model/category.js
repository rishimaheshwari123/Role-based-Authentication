const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subCat: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCat",
        }
    ]
})

module.exports = mongoose.model("Category", categorySchema)