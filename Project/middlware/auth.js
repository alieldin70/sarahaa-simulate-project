const jwt = require('jsonwebtoken');
const userModel = require('../DB/model/User');
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

const Roles = {
    User: "User",
    Admin: "Admin",
    Hr: "Hr"
};
const auth = (accessRoles) => {
    return async(req, res, next) => {
        try {
            const headerToken = req.headers['authorization'];
            if (!headerToken || headerToken == null || headerToken == undefined ||
                !headerToken.startsWith(`${process.env.bearerTokenKey} `)) {
                res.json({ message: "in-valid header token" });
            } else {
                const token = headerToken.split(" ")[1];
                if (!token || token == undefined || token == null || token.length < 1) {
                    res.json({ message: "in-valid token" });
                } else {
                    const decoded = jwt.verify(token, process.env.tokenSignature);
                    const findUser = await
                    userModel.findById(decoded.id).select('name email role');
                    if (!findUser) {
                        res.json({ message: "in-valid user account" });
                    } else {
                        if (accessRoles.includes(findUser.role)) {
                            req.user = findUser;
                            next();
                        } else {
                            res.json({ message: "not auth user" });
                        }

                    }
                }
            }
        } catch (error) {
            res.json({ message: "catch error", error });
        }
    }
}
module.exports = { auth, Roles };