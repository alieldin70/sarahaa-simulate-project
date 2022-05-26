const mongoose = require('mongoose');
const bycrpt = require('bcrypt');
const crypto = require('crypto-js');
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    age: Number,
    gender: {
        type: String,
        default: "male"
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'User'
    },
    profilePic: String,
    profileCoverPic: Array
    ,
    messagesId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    }]

}, {
    timestamps: true
})
userSchema.pre('save', async function(next) {
    this.password = await bycrpt.hash(this.password, parseInt(process.env.saltRound));
   this.phone =crypto.AES.encrypt(this.phone, process.env.KEY).toString()
     next();
});
userSchema.pre("findOneAndUpdate",async function(){
    const user= await this.model.findOne(this.getQuery());
    this.set({__v: user.__v + 1});
});
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;