const uploader = require("../../utils/singleUpload");

const avatarUpload = (req, res, next) => {
    const upload = uploader(
        "avatars",
        ["image/jpeg", "image/jpg", "image/png"],
        1000000,
        "Only .jpg, .jpeg and .png format allowed!"
    );

    // call upload middleware
    upload.any()(req, res, (err) => {
        if (err) {
            return res.send({
                status: false,
                code: 400,
                message: { avatar: err.message },
            });
        }
        next();
    });
};

module.exports = avatarUpload;
