const Conversation = require("../../model/conversation");
const Message = require("../../model/message");

module.exports = async (req, res) => {
    try {
        const conversation = await Conversation.findById(
            req.params.conversationId
        );

        if (conversation) {
            if (
                conversation.creator.id.toString() === req.user.id ||
                conversation.participant.id.toString() === req.user.id
            ) {
                const messages = await Message.find({
                    conversation_id: req.params.conversationId,
                }).sort("-createdAt");

                return res.send({
                    status: true,
                    data: {
                        messages,
                        participant: conversation.participant,
                    },
                    code: 200,
                });
            } else {
                return res.send({
                    status: false,
                    data: [],
                    message: "Invalid user",
                    code: 404,
                });
            }
        } else {
            return res.send({
                status: false,
                data: [],
                message: "Conversation not found",
                code: 404,
            });
        }
    } catch (error) {
        return res.send({
            status: false,
            data: [],
            message: error.message,
            code: 500,
        });
    }
};
