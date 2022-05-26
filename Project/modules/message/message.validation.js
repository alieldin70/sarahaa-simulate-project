const Joi =  require("joi");
const  sendMessage  = {
    body : Joi.object().required().keys({
        messageBody :Joi.string().min(1).max(4000).required()
    }),
    params :Joi.object().required().keys({
        id : Joi.string().min(24).max(24).required()
    }),
    query :Joi.object().keys({
        senderId : Joi.string().min(24).max(24)
    })
};

const  deleteMessage  = {
  
    params :Joi.object().required().keys({
        id : Joi.string().min(24).max(24).required()
    })
};


module.exports =  {
    sendMessage,
    deleteMessage
};