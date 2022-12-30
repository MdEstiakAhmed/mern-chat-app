const { unlink } = require("fs");
const path = require("path");
const Chatter = require("../../model/chatter");

module.exports = async (req, res) => {
    try {
        const user = await Chatter.findByIdAndDelete({ _id: req.params.id });
        if (user) {
            if (user.avatar) {
                unlink(
                    path.join(
                        __dirname,
                        `../../public/uploads/avatars/${user.avatar}`
                    ),
                    (err) => {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
            }
            return res.send({
                status: true,
                code: 200,
                message: "User deleted successfully",
            });
        }
        return res.send({
            status: false,
            code: 404,
            message: "User not found",
        });
    } catch (error) {
        return res.send({
            status: false,
            code: 500,
            message: error.message,
        });
    }
};
