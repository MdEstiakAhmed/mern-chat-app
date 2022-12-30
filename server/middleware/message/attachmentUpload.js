const uploader = require("./../../utils/multipleUpload");

function attachmentUpload(req, res, next) {
    const upload = uploader(
        "attachments",
        ["image/jpeg", "image/jpg", "image/png"],
        1000000,
        2,
        "Only .jpg, jpeg or .png format allowed!"
    );

    // call the middleware function
    upload.any()(req, res, (err) => {
        if (err) {
            return res.send({
                status: false,
                code: 400,
                message: { avatar: err.message },
            });
        } else {
            next();
        }
    });
}

module.exports = attachmentUpload;
