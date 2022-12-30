const Conversation = require("../../model/conversation");

module.exports = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            $or: [
                { "creator.id": req.params.userId },
                { "participant.id": req.params.userId },
            ],
        });

        return res.send({
            status: true,
            data: conversations,
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
