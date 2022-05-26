const crypto = require('crypto-js');
const userModel = require('../../../DB/model/User');
const updateuser = async(req, res) => {
    try {
        const { phone,name } = req.body;
    const cryptphone = crypto.AES.encrypt(phone, process.env.KEY).toString();
    const user = await userModel.findOneAndUpdate({_id:req.user.id}, { phone: cryptphone,name }, { new: true });
    res.status(200).json({ message: "done", user });
    } catch (error) {
    res.status(500).json({message:"catch-error",error});
        
    }
}
module.exports = {updateuser};