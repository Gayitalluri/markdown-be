const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

let markdownContent = "";

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("load", markdownContent);

  socket.on("updateMarkdown", (data) => {
    markdownContent = data;
    socket.broadcast.emit("updateMarkdown", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
