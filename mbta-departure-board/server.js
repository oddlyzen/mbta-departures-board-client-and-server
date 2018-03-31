const express   = require("express");
const http      = require("http");
const socketIo  = require("socket.io");
const csv       = require('csvtojson');
const request   = require("request");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index, () => {});

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getDataAndEmit(socket),
    1000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});

const getDataAndEmit = async socket => {
  try {
    const res = [];
    csv().fromStream(request
      .get("http://developer.mbta.com/lib/gtrtfs/Departures.csv"))
      .on('json', (jsonObj, rowIndex) => {
        res.push(jsonObj);
    }).on("done", () => {
      socket.emit("FromMBTA", res);
    });
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));
