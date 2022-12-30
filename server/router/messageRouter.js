// external imports
const express = require("express");

// internal imports
const addMessage = require("../controller/message/addMessage");
const getMessages = require("../controller/message/getMessages");
const { checkLogin } = require("../middleware/common/checkAuth");
const attachmentUpload = require("../middleware/message/attachmentUpload");

const router = express.Router();

router.post("/add", checkLogin, attachmentUpload, addMessage);
router.get("/:conversationId", checkLogin, getMessages);

module.exports = router;
