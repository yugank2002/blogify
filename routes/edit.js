const router = require('express').Router();
const Blog = require('../models/blog');

router.post('/delete/:id', async (req, res) => {
  // your deletion logic
  
    try {
        await Blog.findByIdAndDelete(req.params.id);
        return res.redirect('/'); // or wherever you want to redirect after deletion
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error deleting the blog');
    }
});

router.get('/:id', async(req,res)=>{
    const blog = await Blog.findById(req.params.id);
    
    return res.render('edit',{
        blog:blog,
        user:req.user
    })
})

router.post('/:id', async (req, res) => {
  const { title, description } = req.body;

  try {
    await Blog.findByIdAndUpdate(req.params.id, {
      title,
      description,
      updatedAt: Date.now()
    });

    res.redirect(`/blog/${req.params.id}`);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;