const { Server } = require("socket.io");

let users = {};

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "https://whiteboard-frontend.netlify.app",
      methods: ["GET", "POST"],
    },
  });


  let texts = [];
  let stickyNotes = [];

  io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);
    

    users[socket.id] = { id: socket.id, color: getRandomColor() };
    io.emit("update-users", Object.values(users));

    socket.on("texts", (data) => {
      socket.broadcast.emit("receive-texts", data.texts);
    });

    socket.on("images", (data) => {
        console.log("images", data)
      socket.broadcast.emit("receive-images", data);
    });
    socket.on("stickyNotes", (data) => {
      socket.broadcast.emit("revcieve-stickeyNotes", data);
      
    });
    socket.on("stickyNotes", (notes) => {
        stickyNotes = notes; 
        io.emit("stickyNotes", stickyNotes); 
      });
  
    socket.on("updateStickyText", ({ id, newText }) => {
        stickyNotes = stickyNotes.map((note) =>
          note.id === id ? { ...note, text: newText } : note
        );
        io.emit("stickyNotes", stickyNotes); 
      });

    socket.on("deleteStickyNote", (id) => {
        stickyNotes = stickyNotes.filter((note) => note.id !== id);
        io.emit("stickyNotes", stickyNotes); 
      });

    //   socket.emit("addText", texts);

    //   socket.on("addText", (updatedTexts) => {
    //     texts = updatedTexts;
    //     socket.broadcast.emit("addText", texts);
    //   });
    
    //   socket.on("updateText", ({ id, text }) => {
    //     texts = texts.map((item) =>
    //       item.id === id ? { ...item, text } : item
    //     );
    //     socket.broadcast.emit("updateText", { id, text });
    //   });



    socket.on("send_message", (data) => {
      io.emit("receive_message", data);
    });

    socket.on("cursorMove", (position) => {
      if (users[socket.id]) {
        users[socket.id].cursor = position;
        io.emit("updateUsers", users);
      }
    });

    socket.on("pen-mode", (data) => {
      socket.broadcast.emit("pen-mode", data);
    });

    socket.on("drawingData", (data) => {
      socket.broadcast.emit("receiveDrawing", data);
    });

    socket.on("clearCanvas", () => {
      io.emit("clearCanvas");
    });

    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected: ${socket.id}`);
      delete users[socket.id];
      io.emit("update-users", Object.values(users));
    });
  });

  return io;
};

// Function to generate a random color
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

module.exports = initializeSocket;




