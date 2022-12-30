const Message = require("../../model/message");

module.exports = async (req, res) => {
    if (req.body.text || (req.files && req.files.length > 0)) {
        try {
            let { receiver } = req.body;
            let parsedReceiver = JSON.parse(receiver);
            let { id, name, avatar } = parsedReceiver || {};
            if (!(id && name)) {
                return res.send({
                    status: false,
                    code: 400,
                    message: "Receiver data is not valid!",
                });
            }

            // save message text/attachment in database
            let attachments = null;

            if (req.files && req.files.length > 0) {
                attachments = [];

                req.files.forEach((file) => {
                    attachments.push(file.filename);
                });
            }

            const newMessage = new Message({
                text: req.body.text,
                attachment: attachments,
                sender: {
                    id: req.user.id,
                    name: req.user.name,
                    avatar: req.user.avatar || null,
                },
                receiver: {
                    id: id,
                    name: name,
                    avatar: avatar || null,
                },
                conversation_id: req.body.conversationId,
            });

            const result = await newMessage.save();

            // emit socket event
            // global.io.emit("new_message", result);
            global.io.emit("new_message", result);

            // global.io.emit("new_message", {
            //     message: {
            //         conversation_id: req.body.conversationId,
            //         sender: {
            //             id: req.user.id,
            //             name: req.user.name,
            //             avatar: req.user.avatar || null,
            //         },
            //         text: req.body.text,
            //         attachment: attachments,
            //         date_time: result.date_time,
            //     },
            // });

            return res.send({
                message: "Successfully send message",
                data: result,
                code: 200,
                status: true,
            });
        } catch (err) {
            return res.send({
                message: err.message,
                code: 500,
                status: false,
            });
        }
    } else {
        return res.send({
            message: "message text or attachment is required!",
            code: 500,
            status: false,
        });
    }
};
