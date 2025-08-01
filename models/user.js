const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const{generateToken} = require('../services/auth');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    salt:{
        type:String,
        
    },
    password:{
        type:String,
        required: true,
    },
    profilePhoto:{
        type:String,
        default: '/images/default.png'
    },
    role:{
        type:String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    }
},{timestamps:true})

userSchema.pre('save', function(next){
        if(!this.isModified('password')) return;

        const secret = randomBytes(16).toString();
        const hash = createHmac('sha256', secret)
                    .update(this.password)
                    .digest('hex');

        this.salt = secret;
        this.password = hash;
        next();
})

userSchema.static("matchPasswordAndGenerateToken", async function(email,password){
    const user = await this.findOne({email:email});
    if(!user){
        throw new Error("User Doesn't Exists, Register First!");
    }
    const salt = user.salt;
    const hashPassword = user.password;

    const newHash = createHmac('sha256', salt)
                    .update(password)
                    .digest('hex');

    if(newHash !== hashPassword){
        throw new Error("Wrong Password! Try Again.");

    }

    const token = generateToken(user);
    return token;

})

const User = mongoose.model('user', userSchema);

module.exports = User;