const jwt = require("jsonwebtoken");

const checkConversationCreator = (req, res, next) => {
    let token = req.headers.token ? req.headers.token : null;
    let conversationCreator = req.body.creator?.id;

    if (!conversationCreator) {
        return res.send({
            message: "Conversation creator is not valid!",
            status: false,
            code: 400,
        });
    }

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
    checkConversationCreator,
};
