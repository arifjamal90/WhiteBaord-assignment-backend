const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const initializeSocket = require("./socketServer"); 
require("./config/database"); 

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);

app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const inviteRoutes = require("./routes/invitationRoutes");
const realTimeRoutes = require("./routes/realTimeRoutes");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/invite", inviteRoutes);
app.use("/api/socket", realTimeRoutes);

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// module.exports = { app, io };
