const { auth } = require('../../middlwear/auth');
const validation = require('../../middlwear/validation');
const { Mymulter, validtypes } = require('../../services/multer');
const { displayProfile, updateProfilePic, updateProfileCoverPic, users} = require('./controller/profile');
const { updateuser } = require('./controller/updateuser');
const updatevalidator = require('./update.validation');
const endPoint = require('./user.endPoint');
const router = require('express').Router();
router.get("/user/profile", auth(endPoint.profile), displayProfile);
router.get("/user", users);
router.patch('/user/update',validation(updatevalidator),auth(endPoint.update),updateuser);
router.patch('/user/updatepic',Mymulter('/user/ProfilePic',validtypes.image).single('image'),auth(endPoint.update),updateProfilePic);
router.patch('/user/updatecoverpic',Mymulter('/user/coverPic',validtypes.image).array('image'),auth(endPoint.update),updateProfileCoverPic);
module.exports = router;