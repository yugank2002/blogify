const router = require('express').Router();
const User = require('../models/user');


router.get('/login',(req, res) => {
    return res.render('login', { error: req.query.error || null });
    
})

router.get('/signup', (req, res) => {
    return res.render('signup', { error: null });
});

router.get('/logout', (req,res) =>{
    res.clearCookie("token");
    return res.redirect('/');
    
})


router.post('/signup', async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const user = await User.findOne({email:email});
    
    if (user) {
        return res.render('signup', { error: 'Email already exists. Use another.' });
    }

   await User.create({
        fullName:req.body.fullName,
        email:req.body.email,
        password: req.body.password
    })

    return res.redirect('/user/login');

})

router.post('/login', async (req, res) =>{
    const{email,password} = req.body;
     try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        res.cookie("token", token);
        return res.redirect('/');
    } catch (err) {
        return res.render('login', { error: err.message });
    }

})


module.exports = router;