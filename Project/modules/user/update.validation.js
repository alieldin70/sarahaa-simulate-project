const joi = require('joi');
const updatevalidator = {
    body: joi.object().required().keys({
        phone: joi.number(),
        name:joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)).required().messages({
            'string.empty': "plz fill in u name",
            'string.pattern.base': "plz enter char",
            'any.required': "plz send u name"
        })
    })
};
module.exports = updatevalidator;