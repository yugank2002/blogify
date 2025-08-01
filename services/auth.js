const jwt = require('jsonwebtoken');
const secretKey = "JaiShreeKrishna";

const generateToken = (user) =>{
    const payload = {
        userid: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePhoto: user.profilePhoto,
        role: user.role,
        createdAt: user.createdAt
    }
    const token = jwt.sign(payload,secretKey);
    return token;

}

const verifyToken = (token) =>{
    const payload = jwt.verify(token,secretKey);
    return payload;
}

module.exports = {
    generateToken,
    verifyToken
}