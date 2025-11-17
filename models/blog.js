const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    coverPhoto:{
        type:String,
        required:false
    },
    video:{
        type:String,
        required:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

const Blog = mongoose.model('blog',blogSchema);

module.exports = Blog;