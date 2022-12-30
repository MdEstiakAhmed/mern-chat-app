const Chatter = require("../../model/chatter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Chatter.findOne({
            $or: [{ email: username }, { phone: username }],
        });
        if (user && user._id) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const userObject = {
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    role: user.role,
                    id: user._id,
                    avatar: user.avatar,
                };
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: "1d",
                });

                res.cookie(process.env.COOKIE_NAME, token, {
                    httpOnly: true,
                    maxAge: process.env.COOKIE_EXPIRY,
                    signed: true,
                });

                let userResponse = { user };
                userResponse.token = token;

                return res.send({
                    message: "Login successful",
                    status: true,
                    code: 200,
                    data: userResponse,
                });
            } else {
                throw createError("Invalid credentials");
            }
        } else {
            throw createError("Invalid credentials");
        }
    } catch (error) {
        return res.send({
            message: error.message,
            status: false,
            code: 400,
            data: {},
        });
    }
};
