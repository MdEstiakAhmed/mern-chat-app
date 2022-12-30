const checkRole = (roleArray) => {
    return (req, res, next) => {
        if (roleArray.includes(req.user.role)) {
            next();
        } else {
            res.send({
                message: "Unauthorized access",
                status: false,
                code: 401,
            });
        }
    };
};

module.exports = {
    checkRole,
};
