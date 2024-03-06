const express = require("express");
const cors = require("cors");
const multer = require("multer");
const http = require("http");
const socketIo = require("socket.io");
// const fs = require("fs");

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

const delayOf5Sec = () => {
  const now = new Date(); // Current time
  return new Date(now.getTime() + 2 * 1000);
};

io.on("connection", (socket) => {
  socket.on("play-in-all-devices", () => {
    const timeAfter5Seconds = delayOf5Sec();
    console.log(">> songs will be played after", timeAfter5Seconds);
    socket.broadcast.emit("play-song", { timeStamp: timeAfter5Seconds });
    socket.emit("play-song", { timeStamp: timeAfter5Seconds });
  });

  socket.on("pause-in-all-devices", () => {
    const timeAfter5Seconds = delayOf5Sec();
    console.log(">>> pause-song", timeAfter5Seconds);
    socket.broadcast.emit("pause-song", { timeStamp: timeAfter5Seconds });
    socket.emit("pause-song", { timeStamp: timeAfter5Seconds });
  });
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
