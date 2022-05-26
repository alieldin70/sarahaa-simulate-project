const userModel = require("../../../DB/model/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const finduser = await userModel.findOne({ email });
    if (finduser) {
      //409 conflict code for exist user server will do nothing 
      res.status(409).json({ message: "exist email" });
    } else {
      const user = new userModel({ name, email, password, phone });
      const saveduser = await user.save();
      //201 means that the user is created 
      res.status(201).json({ message: "created", user: saveduser });
    }

  } catch (error) {
    res.status(500).json({ message: "Catch-Error", error });
  }
}
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "in-valid email" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(400).json({ message: "in-valid password" });
      } else {
        const token = jwt.sign({ id: user.id }, process.env.tokenSignature, { expiresIn: "1h" });
        res.status(200).json({ message: "Done", token });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Catch-Error", error });
  }

}

module.exports = { signup, signin };