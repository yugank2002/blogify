const router = require('express').Router();
const multer  = require('multer')
const path = require('path');
const Blog = require('../models/blog');
const {forLoggedInUsersOnly} =  require('../middlewares/auth')
const Comment = require('../models/comment')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`))
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null, fileName)
  }
})

// Allow uploads (images and videos) using the same storage
const upload = multer({ storage: storage })

router.get('/', async(req , res) => {
    
    return res.render('add-blogs',{
        user:req.user
    });
})

router.post('/', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
    const { title, description } = req.body;

    const coverFile = req.files && req.files.coverImage ? req.files.coverImage[0] : null;
    const videoFile = req.files && req.files.video ? req.files.video[0] : null;

    const newBlog = await Blog.create({
        title,
        description,
        coverPhoto: coverFile ? `/uploads/${coverFile.filename}` : undefined,
        video: videoFile ? `/uploads/${videoFile.filename}` : undefined,
        createdBy: req.user.userid,
    });

    return res.redirect(`/blog/${newBlog._id}`);

})

router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('createdBy');
        const comments = await Comment.find({blogId:req.params.id}).populate('createdBy');

        return res.render('blog', {
            user: req.user,
            comments:comments,
            blog: blog
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Something went wrong.');
    }
});

router.post('/:id', forLoggedInUsersOnly, async(req,res)=>{
    await Comment.create({
        comment:req.body.comment,
        blogId: req.params.id,
        createdBy: req.user.userid
    })
    res.redirect(`/blog/${req.params.id}`);
})






module.exports = router;