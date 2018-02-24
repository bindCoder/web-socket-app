
const express = require("express");
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');


const appPath = path.join(__dirname, '/app');
const app = express();
const port = process.env.PORT || 9999;

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(appPath));

io.on('connection', (socket) => {
    socket.emit("newMessage", {
        from: 'Admin',
        text: 'Welcome to chat room '
    });
    socket.on("newJoinee", (message) => {

        socket.broadcast.emit("newMember", {
            from: 'Admin',
            text: message.from + " has joined the chat"
        })
    })
    socket.on("newMessage",(msg)=>{
         socket.broadcast.emit("newMessage", {
            from: msg.from,
            text: msg.text
        })
    });
    socket.on('disconnect', () => {
        console.log("User Disconnected");
    })
})

server.listen(port, () => {
    console.log(`Server running on ${port}`);
})