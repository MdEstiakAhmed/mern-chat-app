const createError = require("http-errors");

// 404 not found
function notFoundHandler(req, res, next) {
    const NOT_FOUND_ERROR = "Resource not found";
    next(createError(404, NOT_FOUND_ERROR));
}

// default error handler
function errorHandler(err, req, res, next) {
    res.locals.error =
        process.env.NODE_ENV === "development" ? err : err.message;
    res.send({
        status: false,
        code: err.status || 500,
        message: res.locals.error,
    });
}

module.exports = {
    notFoundHandler,
    errorHandler,
};
