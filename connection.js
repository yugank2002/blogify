const mongoose = require('mongoose');

const connection = (url) =>{
    mongoose.connect(url).then(()=>{
        console.log("MongoDB Connected");
    })
    .catch((e)=>{
        console.log("Refuse to connect DB");
    })
}

module.exports = connection;