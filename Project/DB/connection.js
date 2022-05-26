const mongoose = require('mongoose');


const connectDB =  ()=>{
    return mongoose.connect(process.env.DBURL).then((result)=>{
        console.log("connect DB");
    }).catch(err => console.log("fail to connect DB" , err))
}

module.exports = connectDB