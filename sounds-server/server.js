const express = require("express");
const cors = require("cors");
const multer = require("multer");
const http = require("http");
// const socketIo = require("socket.io");
const fs = require("fs");
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

// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   const chunkSize = 1024; // Adjust the chunk size as needed

//   // const mp3Chunk = [];

//   const mp3Stream = fs.createReadStream("audio.mp3", {
//     highWaterMark: chunkSize,
//   });
//   console.log("🚀 ~ file: Server.js:34 ~ io.on ~ mp3Stream:", mp3Stream);

//   // mp3Stream.on("data", (chunk) => {
//   //   console.log(">>> not working")
//   //   mp3Chunk.push(chunk);
//   // });
//   // console.log(">>> mp3Chunk", mp3Chunk);

//   socket.emit("clientId", handlingDevices());
//   // socket.emit("newChunk", sendNextChunk());
//   socket.on("handshake", handshakeRecord(socket));
//   socket.on("startCall", startCall(socket));
// });

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

app.post("/upload-2", (req, res) => {
  console.log(">>> uoloadu-2");
  res.status(200).write("Noice");
});

// app.get("/stream-audio", streamAudio);

const port = 4001;
server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

/* 
Big plan

the music will be stored in the uploads and will be stored in database
after that when all have listened after 30min delete it then

*/
