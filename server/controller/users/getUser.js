const Chatter = require("../../model/chatter");

module.exports = async (req, res) => {
    try {
        const user = await Chatter.findOne({ _id: req.params.id });
        if (user) {
            return res.send({
                status: true,
                code: 200,
                data: user,
            });
        } else {
            return res.send({
                status: false,
                code: 404,
                message: "User not found",
            });
        }
    } catch (error) {
        return res.send({
            status: false,
            code: 500,
            message: error.message,
        });
    }
};
