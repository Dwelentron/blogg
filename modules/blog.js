const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    Snippet:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required: true
    }
}, {timestamps: true})

const Blog = mongoose.model("Blogs", blogSchema)


module.exports = Blog