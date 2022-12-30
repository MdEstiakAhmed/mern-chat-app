// external modules import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// internal modules import
const {
    notFoundHandler,
    errorHandler,
} = require("./middleware/common/errorHandler");
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const messageRouter = require("./router/messageRouter");

const conversationRouter = require("./router/conversationRouter");

const app = express();
// cors
app.use(cors());

// create server
const server = http.createServer(app);

// load env variables
dotenv.config();

// socket.io setup
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
global.io = io;

// database connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    });

// middleware
app.use(express.json());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/conversations", conversationRouter);

// 404 not found
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
