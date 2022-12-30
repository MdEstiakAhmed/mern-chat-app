const Chatter = require("../../model/chatter");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    // console.log(req.files);
    // return res.send({});
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length) {
        newUser = new Chatter({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword,
        });
    } else {
        newUser = new Chatter({
            ...req.body,
            role: "admin",
            password: hashedPassword,
        });
    }

    try {
        const response = await newUser.save();
        res.send({
            status: true,
            code: 200,
            message: "User added successfully",
            data: response,
        });
    } catch (error) {
        res.send({
            status: false,
            code: 500,
            message: error.message,
        });
    }
};
