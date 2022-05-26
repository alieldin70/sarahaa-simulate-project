const Joi = require('joi')


const signupValidator = {
    body: Joi.object().required().keys({
        name: Joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)).required().messages({
            'string.empty': "plz fill in u name",
            'string.pattern.base': "plz enter char",
            'any.required': "plz send u name"
        }),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword: Joi.string().valid(Joi.ref('password')).required(),
        phone: Joi.number()

    })
};


const signinValidator = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    })
};
module.exports = { signupValidator, signinValidator };