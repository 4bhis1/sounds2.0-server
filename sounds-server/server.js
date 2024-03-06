const express = require("express");
const cors = require("cors");
const multer = require("multer");
const http = require("http");
const socketIo = require("socket.io");
// const fs = require("fs");
// const {
//   handlingDevices,
//   sendNextChunk,
//   handshakeRecord,
//   startCall,
// } = require("./src/res/handlingComputes");

const app = express();
app.use(cors());

app.use(express.static("uploads"));

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // socket.emit("clientId", handlingDevices());
  // socket.emit("newChunk", sendNextChunk());

  socket.on(
    "play-in-all-devices",
    () => {
      console.log(">>> noice");

      setTimeout(() => {
        socket.broadcast.emit("play-song");
      }, 900);

      socket.emit("play-song");
    }
    // socket.broadcast.emit("newChunk", chunkData)
  );

  socket.on(
    "pause-in-all-devices",
    () => {
      console.log(">>> pause-song");

      socket.broadcast.emit("pause-song");
      socket.emit("pause-song");
    }
    // socket.broadcast.emit("newChunk", chunkData)
  );
  // socket.on("pause", startCall(socket));
});

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}` || "audio.mp3");
  },
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.json("File uploaded Successfully.");
});

const port = 4001;
server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
