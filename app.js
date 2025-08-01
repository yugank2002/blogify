require('dotenv').config()
const express = require('express');
const path = require('path');
const connection = require('./connection');
const cookieParser = require('cookie-parser')
const {authentication} = require('./middlewares/auth')
const Blog = require('./models/blog');
const methodOverride = require('method-override');

connection(process.env.MONGO_URL);

const app = express();
const port = process.env.PORT;

const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const editRouter = require('./routes/edit');
const myBlogRouter = require('./routes/myblog');
const myProfileRouter = require('./routes/myprofile');


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(authentication);
app.use(express.static(path.resolve('./public')));
app.use(methodOverride('_method'));

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/edit',editRouter);
app.use('/myblog', myBlogRouter);
app.use('/myprofile', myProfileRouter);

app.get('/', async(req, res)=>{
    const allBlogs = await Blog.find({}).sort({createdAt:-1})
    return res.render('home', {
        user:req.user,
        blogs: allBlogs,
        title: 'Blogify - Home'
    })
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})