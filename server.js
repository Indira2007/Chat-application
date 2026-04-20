const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, "public")));
const botName = "ChatCord Bot";

//run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    //sends message to single client including the user that actually sent the message
    socket.emit("message", formatMessage(botName, "WELCOME TO CHATCORD!"));

    //broadcast to all clients when a user connects except the user that actually sent
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has connected`),
      );
  });

  //all the clients in general
  // io.emit("message", "A user has joined the chat");

  //listen for chatMessage
  socket.on("chatMessage", (message) => {
    const user = getCurrentUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", formatMessage(user.username, message));
    }
  });

  //runs when client disconnects
  // socket.on("disconnect", () => {
  //   io.emit("message", formatMessage(botName, `${user.username} has left chat`));
  // });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
