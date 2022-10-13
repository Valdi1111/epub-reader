
function error(res, code, err, msg) {
    return res.status(code).json({
        error: err,
        message: msg
    });
}

exports.error = error;

exports.badRequest = function (res, err, msg) {
    return error(res, 400, err, msg);
}

exports.unauthorized = function (res, err, msg) {
    return error(res, 401, err, msg);
}

exports.forbidden = function (res, err, msg) {
    return error(res, 403, err, msg);
}

exports.notFound = function (res, err, msg) {
    return error(res, 404, err, msg);
}

exports.internalError = function (res, err) {
    console.error(err);
    return error(res, 500, "internal_error", "Internal server error!");
}

// 400 - bad request
// 401 - unauthorized
// 403 - forbidden