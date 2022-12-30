module.exports = async (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send({
        message: "Logout successful",
        status: true,
        code: 200,
        data: {},
    });
};
