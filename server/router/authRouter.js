// external modules import
const express = require("express");

// internal modules import
const loginController = require("../controller/auth/login");
const signupController = require("../controller/auth/signup");
const logoutController = require("../controller/auth/logout");
const {
    loginFormValidator,
    validationHandler,
} = require("../middleware/login/loginValidator");
const avatarUpload = require("../middleware/user/avatarUpload");
const { userFormValidator } = require("../middleware/user/formValidator");
const validationErrorHandler = require("../middleware/user/validationErrorHandler");

const router = express.Router();

router.post("/login", loginFormValidator, validationHandler, loginController);
router.post(
    "/signup",
    avatarUpload,
    userFormValidator,
    validationErrorHandler,
    signupController
);
router.get("/logout", logoutController);

module.exports = router;
