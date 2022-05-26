const validation = require('../../middlwear/validation');
const { signupValidator, signinValidator } = require('./auth.validation');
const registeration = require('./controller/registeration');
const router = require('express').Router();
const {Mymulter,validtypes}=require('../../services/multer')
router.post('/signup',Mymulter('/user/ProfilePic',validtypes.image).array('images',5) ,validation(signupValidator),registeration.signup);
router.post('/signin', validation(signinValidator), registeration.signin);
module.exports = router;