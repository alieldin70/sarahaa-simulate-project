const router = require('express').Router();
const messageController = require("./controller/message")
const messageValidators = require('./message.validation')
const validation = require("../../middlwear/validation")
const {auth} = require("../../middlwear/auth");
const endPoint = require('./message.endPoint');
router.post('/message/:id', validation(messageValidators.sendMessage),messageController.sendMessage);
router.get("/message" , auth(endPoint.getMessages) ,messageController.userMessages );
router.get("/message/sender" , auth(endPoint.getMessages) ,messageController.userSendedMessages );
router.delete('/message/:id' ,validation(messageValidators.deleteMessage) ,auth(endPoint.deleteMessage) ,messageController.deleteMessage);
module.exports = router;