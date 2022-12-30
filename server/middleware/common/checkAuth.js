const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
    let token = req.headers.token ? req.headers.token : null;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.send({
                message: "Invalid token",
                status: false,
                code: 400,
            });
        }
    } else {
        res.send({
            message: "Unauthorized access",
            status: false,
            code: 401,
        });
    }
};

module.exports = {
    checkLogin,
};
