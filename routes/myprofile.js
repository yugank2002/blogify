const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const multer  = require('multer');
const path = require('path');
const{generateToken} = require('../services/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/profilePhoto`))
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${req.user.name}-${file.originalname}`
    cb(null, fileName)
  }
})

const upload = multer({ storage: storage })

router.get('/', async(req,res)=>{
    const blogsCount = await Blog.countDocuments({ createdBy: req.user.userid });
    const commentsCount = await Comment.countDocuments({ createdBy: req.user.userid });

    
    return res.render('myprofile',{
        user: req.user,
        blogsCount: blogsCount,    
        commentsCount: commentsCount
    });
})

router.post('/updatePhoto', upload.single('profilePhoto'), async(req,res)=>{
    const user = await User.findByIdAndUpdate(
        req.user.userid,
        {
            profilePhoto: `/profilePhoto/${req.file.filename}`
        },
        { new: true } // <-- this is the fix
        );

    res.clearCookie("token");
    const token = generateToken(user);
    res.cookie("token", token);

    return res.redirect('/myprofile');
})

module.exports = router;