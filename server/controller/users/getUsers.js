const Chatter = require("../../model/chatter");

module.exports = async (req, res) => {
    try {
        const users = await Chatter.find();
        return res.send({
            status: true,
            code: 200,
            data: users,
        });
    } catch (error) {
        return res.send({
            status: false,
            code: 500,
            message: error.message,
        });
    }
};
