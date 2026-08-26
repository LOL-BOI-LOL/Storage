const fs         = require("fs"),
      http       = require("http"),
      express    = require("express"),
      app        = express(),
      server     = http.createServer(app),
      { Server } = require("socket.io"),
      io         = new Server(server),
      room       = {
        playerList:        Array.from(Array(5)),
        hands:             [[], [], [], [], []],
        deck:              [],
        dealt:             [],
        roundParticipants: [],
        turn:              1,
        bet:               1
      };

for (let suit = 0; suit < 4; ++suit) {
  for (let symbol = 0; symbol < 13; ++symbol) {
    room["deck"].push(["A", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"][symbol]);
  }
}

app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));

server.listen(3000);

io.on("connect", socket => {
  socket.on("join request", () => {
    if (room["playerList"].indexOf(undefined) > -1) {
      io.to(socket.id).emit("join");
      let i = room["playerList"].indexOf(undefined);
      room["playerList"][i] = socket.id;
      socket.player = i;
      socket.join("room1");
    }
    room["hands"].forEach((v, i) => {
      if (v.length > 0)
        v.forEach(() => io.to(socket.id).emit("draw card", "?", i));
    });
    ["", ""].forEach(() => {
      random = Math.floor(Math.random() * room["deck"].length);
      io.to(socket.id).emit("draw card", room["deck"][random], socket.player);
      socket.to("room1").emit("draw card", "?", socket.player);
      room["hands"][socket.player].push(room["deck"][random]);
      room["deck"].splice(random, 1);
    });
  });

  socket.on("check", () => {
    
  });

  socket.on("fold", () => {
    
  });

  socket.on("raise", amount => {
    
  });
  
  socket.on("disconnect", () => {
    room["playerList"][socket.player] = undefined;
    room["deck"][socket.player] = [];
  });
});