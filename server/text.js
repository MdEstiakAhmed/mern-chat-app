const express = require("express");
const http = require("http");
const app = express();
const expressServer = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(expressServer);

io.on("connection", (socket) => {
    // socket is the client connection
    console.log("a user connected");

    // listen to client message
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3001, () => {
    console.log("Server listening on port 3000");
});
