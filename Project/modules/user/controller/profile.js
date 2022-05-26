const userModel = require("../../../DB/model/User")
const fs=require('fs');
const path=require('path');
const users = async (req, res) => {
try {
   
    const user = await userModel.find({}).populate({
        path:'messagesId'
    });
    res.status(200).json({ message: "Done", user }); 
} catch (error) {
    res.status(500).json({ message: "Catch-Error", error });
}
  
}
const displayProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        res.status(200).json({ message: "Done", user });
    } catch (error) {
        res.status(500).json({ message: "Catch-Error", error });
    }
}


const updateProfilePic = async (req, res) => {
    try {
        const olduser = await userModel.findById(req.user.id);
    fs.unlinkSync(`${path.join(__dirname,olduser.profilePic)}`);
    const imageurl=`${ req.filedistenation}/${req.file.filename}`;
    const newuser = await userModel.findOneAndUpdate({_id:req.user.id},{profilePic:imageurl},{new:true});
    res.status(200).json({message:"updated",newuser});
    } catch (error) {
    res.status(500).json({message:"catch-error",error});
        
    }

}
const updateProfileCoverPic = async (req, res) => {
 try {
    const urlarr=[]
    for (let i = 0; i < req.files.length; i++) {
        urlarr.push(`${ req.filedistenation}/${req.files[i].filename}`);
    }
    const newuser = await userModel.findOneAndUpdate({_id:req.user.id},{profileCoverPic:urlarr},{new:true});
    res.status(200).json({message:"updated",newuser});  
 } catch (error) {
    res.status(500).json({message:"catch-error",error});
     
 }
}
module.exports = { displayProfile, updateProfilePic, updateProfileCoverPic ,users};