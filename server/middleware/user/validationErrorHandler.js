const { validationResult } = require("express-validator");
const { unlink } = require("fs");
const path = require("path");

const validationErrorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = {};
        errors.array().map((err) => (extractedErrors[err.param] = err.msg));
        if (req.files?.length) {
            const { filename } = req.files[0];
            unlink(
                path.join(
                    __dirname,
                    `../../public/uploads/avatars/${filename}`
                ),
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                }
            );
        }
        return res.send({
            status: false,
            code: 422,
            message: extractedErrors,
        });
    }
    return next();
};

module.exports = validationErrorHandler;
