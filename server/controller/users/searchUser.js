const Chatter = require("../../model/chatter");
const escape = require("../../utils/escape");

module.exports = async (req, res) => {
    try {
        const searchQuery = req.query.query;

        const nameSearchRegex = new RegExp(escape(searchQuery), "i");
        const emailSearchRegex = new ReqExp(
            "^" + escape(searchQuery) + "$",
            "i"
        );

        if (searchQuery) {
            const users = await Chatter.find(
                {
                    $or: [
                        { name: nameSearchRegex },
                        { email: emailSearchRegex },
                    ],
                },
                "name avatar"
            );

            return res.send({
                status: true,
                data: users,
                code: 200,
            });
        } else {
            return res.send({
                status: false,
                data: [],
                message: "Please enter a query",
                code: 400,
            });
        }
    } catch (error) {
        return res.send({
            status: false,
            data: [],
            message: "Something went wrong",
            code: 500,
        });
    }
};
