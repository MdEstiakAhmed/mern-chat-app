const Conversation = require("../../model/conversation");

module.exports = async (req, res) => {
    try {
        let { participant } = req.body;
        let { id, name, avatar } = participant;

        if (participant && id && name) {
            const newConversation = new Conversation({
                creator: {
                    id: req.user.id,
                    name: req.user.name,
                    avatar: req.user?.avatar || null,
                },
                participant: {
                    id: id,
                    name: name,
                    avatar: avatar || null,
                },
            });

            const result = await newConversation.save();
            return res.send({
                status: true,
                code: 200,
                message: "Conversation was added successfully!",
            });
        } else {
            return res.send({
                status: false,
                code: 400,
                message: "Conversation data is not valid!",
            });
        }
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
};
