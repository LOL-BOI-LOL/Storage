const http       = require('http'),
      express    = require('express'),
      app        = express(),
      server     = http.createServer(app),
      { Server } = require("socket.io"),
      io         = new Server(server);

app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));

server.listen(3000);

io.on("connection", (socket) => {
  socket.on("join room", () => {
    socket.join("room1");
    io.to(socket.id).emit("join success");
    let coords = [Math.floor(10 + Math.random() * 280), Math.floor(10 + Math.random() * 280)];
    io.to("room1").emit("update",
                        ...coords,
                        Math.floor( 5 + Math.random() * (coords[0] - 5)),
                        Math.floor( 5 + Math.random() * (coords[1] - 5)),
                        "rgb(" + Math.floor(100 + Math.random() * 155) + "," + Math.floor(100 + Math.random() * 155) + "," + Math.floor(100 + Math.random() * 155) + ")"
                       );
  });

  socket.on("click", () => {
    let coords = [Math.floor(10 + Math.random() * 280), Math.floor(10 + Math.random() * 280)];
    io.to("room1").emit("update",
                        ...coords,
                        Math.floor( 5 + Math.random() * (coords[0] - 5)),
                        Math.floor( 5 + Math.random() * (coords[1] - 5)),
                        "rgb(" + Math.floor(100 + Math.random() * 155) + "," + Math.floor(100 + Math.random() * 155) + "," + Math.floor(100 + Math.random() * 155) + ")"
                       );
  });
});