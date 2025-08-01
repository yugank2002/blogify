const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', async(req,res)=>{
    const myBlogs = await Blog.find({createdBy:req.user.userid}).sort({createdAt:-1})
    
    return res.render('myblogs',{
        user:req.user,
        blogs:myBlogs
    });
})

module.exports = router;