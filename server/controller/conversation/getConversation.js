const Conversation = require("../../model/conversation");

module.exports = async (req, res) => {
    try {
        const conversation = await Conversation.findById(
            req.params.conversationId
        );

        return res.send({
            status: true,
            data: conversation,
            code: 200,
        });
    } catch (error) {
        return res.send({
            status: false,
            data: [],
            message: "Something went wrong",
            code: 500,
        });
    }
};
