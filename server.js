const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); // importing class from socket.io 

const app = express();
const server = http.createServer(app);
const io = new Server(server); // creating object of Server with express server

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3002, () => {
  console.log("Server is running on localhost:3002. ");
});



