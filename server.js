const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); // importing class from socket.io 

const app = express();
const server = http.createServer(app);
const io = new Server(server); // creating object of Server with express server

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get("/text-chat", (req, res) => {
  res.sendFile(__dirname + "/public/text-chat.html");
});

app.get("/video-chat", (req, res) => {
  res.sendFile(__dirname + "/public/video-chat.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // NOTE: The following logic implemented for text chat ONLY. after line number 43 video chat logic begins
  // To establish socket io connection -- front needs socket.io js script-- Refer text-chat.html
  // Handle connection events
  // Step 1: (Refer text-chat.html for step)
  // listening to all custom events emitted By front end
  socket.on("chat_message", (message) => {
    console.log(message); // receiving the one user's chat message

    // broadcasting to all clients (users)
    io.emit("broadcast_chat_message", message);
  });

  socket.on("typing", (msg) => {
    console.log(msg);
    // broadcasting message to all clients (users)
    io.emit("broadcast_typing_status", msg);
  });
  /* TEXT CHAT LOGIC ENDED */

  /* NOTE: THE FOLLOWING ARE FOR VIDEO CHAT */
  // Handle 'offer' event
  socket.on("offer", (offer) => {
    // Broadcast the offer to all other connected clients
    socket.broadcast.emit("offer", offer);
  });

  // Handle 'answer' event
  socket.on("answer", (answer) => {
    // Broadcast the answer to all other connected clients
    socket.broadcast.emit("answer", answer);
  });

  // Handle 'ice-candidate' event
  socket.on("ice-candidate", (candidate) => {
    // Broadcast the ICE candidate to all other connected clients
    socket.broadcast.emit("ice-candidate", candidate);
  });

  // handle disconnection - used for both
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});



server.listen(3002, () => {
  console.log("Server is running on localhost:3002. ");
});



