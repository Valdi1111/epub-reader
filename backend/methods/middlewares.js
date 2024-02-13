const jwt = require('jsonwebtoken');
const response = require('./response');

exports.protect = async function (req, res, next) {
    let token = req.headers["x-access-token"];
    if (!token) {
        return response.forbidden(res, "invalid_token", "No token provided!");
    }
    let result;
    try {
        result = await jwt.verify(token, process.env.SECRET);
    } catch (e) {
        return response.forbidden(res, "invalid_token", "Token invalid or expired!");
    }
    if (!result) {
        return response.forbidden(res, "invalid_token", "Token invalid or expired!");
    }
    req.token = token;
    req.user_id = result.id;
    return next();
}
