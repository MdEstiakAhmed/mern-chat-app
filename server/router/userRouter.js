// external imports
const express = require("express");

// internal imports
const getUsers = require("../controller/users/getUsers");
const getUser = require("../controller/users/getUser");
const addUser = require("../controller/users/addUser");
const avatarUpload = require("../middleware/user/avatarUpload");
const { userFormValidator } = require("../middleware/user/formValidator");
const validationErrorHandler = require("../middleware/user/validationErrorHandler");
const deleteUser = require("../controller/users/deleteUser");
const searchUser = require("../controller/users/searchUser");
const { checkLogin } = require("../middleware/common/checkAuth");
const { checkRole } = require("../middleware/common/checkRole");

const router = express.Router();

router.get("/search?query=:query", checkLogin, searchUser);

router.get("/", checkLogin, checkRole(["admin"]), getUsers);

router.get("/:id", checkLogin, checkRole(["admin"]), getUser);

router.post(
    "/add",
    checkLogin,
    checkRole(["admin"]),
    avatarUpload,
    userFormValidator,
    validationErrorHandler,
    addUser
);

router.delete("/:id", checkLogin, checkRole(["admin"]), deleteUser);

module.exports = router;
