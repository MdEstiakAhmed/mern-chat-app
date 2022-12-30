const { check, buildCheckFunction } = require("express-validator");
const createError = require("http-errors");
const Chatter = require("../../model/chatter");

const checkInFields = buildCheckFunction(["body"]);

const userFormValidator = [
    checkInFields("name")
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),
    checkInFields("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async (value) => {
            try {
                const user = await Chatter.findOne({ email: value });
                if (user) {
                    throw createError("Email already exists");
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
    checkInFields("phone")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Mobile number must be a valid Bangladeshi mobile number")
        .custom(async (value) => {
            try {
                const user = await Chatter.findOne({ phone: value });
                if (user) {
                    throw createError("Phone already exists");
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
    checkInFields("password")
        .isStrongPassword()
        .withMessage(
            "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
        ),
];

module.exports = { userFormValidator };
