// external imports
const express = require("express");

// internal imports
const { checkLogin } = require("../middleware/common/checkAuth");
const getConversations = require("../controller/conversation/getConversations");
const getConversation = require("../controller/conversation/getConversation");
const addConversation = require("../controller/conversation/addConversation");

const router = express.Router();

router.get("/all/:userId", checkLogin, getConversations);
router.get("/info/:conversationId", checkLogin, getConversation);
router.post("/add", checkLogin, addConversation);

module.exports = router;
