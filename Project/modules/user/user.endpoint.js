const { Roles } = require("../../middlwear/auth");

const endPoint =  {
    profile : [Roles.Admin , Roles.Hr , Roles.User],
    update : [Roles.User]
};

module.exports = endPoint;