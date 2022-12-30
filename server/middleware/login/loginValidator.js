const { check, validationResult } = require("express-validator");

const loginFormValidator = [
    check("username").isLength({ min: 1 }).withMessage("Username is required"),
    check("password").isLength({ min: 1 }).withMessage("Password is required"),
];

const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = {};
    errors.array().map((err) => (extractedErrors[err.param] = err.msg));
    return res.send({
        status: false,
        code: 422,
        message: extractedErrors,
    });
};

module.exports = {
    loginFormValidator,
    validationHandler,
};
