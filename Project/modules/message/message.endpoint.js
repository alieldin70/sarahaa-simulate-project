const { Roles } = require("../../middlwear/auth");

const endPoint = {
    getMessages  : [Roles.User],
    deleteMessage : [Roles.User]

};

module.exports = endPoint;