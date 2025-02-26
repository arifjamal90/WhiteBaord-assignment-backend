// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });


// const realTimeRoutes = require("./routes/realTimeRoutes");
// app.use("/api", realTimeRoutes);

// let drawings = [];
// let users = {};

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   // Send existing drawings to new users
//   socket.emit("load-drawings", drawings);

//   // Broadcast user presence
//   users[socket.id] = { id: socket.id, color: getRandomColor() };
//   io.emit("update-users", Object.values(users));

//   // Listen for drawing events
//   socket.on("draw", (data) => {
//     drawings.push(data);
//     socket.broadcast.emit("draw", data);
//   });

//   // Handle clear/reset events
//   socket.on("clear", () => {
//     drawings = [];
//     io.emit("clear");
//   });

//   // Handle sticky note updates
//   socket.on("add-sticky", (note) => {
//     io.emit("add-sticky", note);
//   });

//   // Handle chat messages
//   socket.on("send-message", (message) => {
//     io.emit("receive-message", message);
//   });

//   // Handle disconnect
//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//     delete users[socket.id];
//     io.emit("update-users", Object.values(users));
//   });
// });

// server.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

// function getRandomColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }


let savedDrawings = []; // Store drawings in memory

// Save drawings
exports.save = (req, res) => {
  const { drawings } = req.body;

  if (!drawings) {
    return res.status(400).json({ message: "No drawings provided" });
  }

  savedDrawings = drawings;
  res.json({ message: "Drawings saved successfully", savedDrawings });
};

// Load drawings
exports.load = (req, res) => {
  res.json({ savedDrawings });
};
