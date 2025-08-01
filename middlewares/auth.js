const { verifyToken } = require('../services/auth');

const authentication = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        
        return next();
    }

    try {
        const user = verifyToken(token);
        req.user = user;
    } catch (err) {
        console.error("Token verification failed:", err.message);
    }

    return next();
};

const forLoggedInUsersOnly = (req,res,next) =>{
    const token = req.cookies?.token;

    if (!token) {
       return res.redirect('/user/login?error=You need to login first');
    }
     return next();
}

module.exports = {
    authentication,
    forLoggedInUsersOnly
};
