const fs         = require('fs'),
      http       = require('http'),
      express    = require('express'),
      app        = express(),
      server     = http.createServer(app),
      { Server } = require("socket.io"),
      io         = new Server(server);

app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));

server.listen(3000);

io.on('connection', (socket) => {
  socket.join('room1');
  socket.username = "Guest User";
  fs.readFile('room1.txt', (_, data) => io.to(socket.id).emit("load messages", data.toString()));
  socket.on('chat message', msg => {
    date = (new Date()).toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'medium', timeZone: 'America/New_York' });
    for (let i = 1; i < 4; ++i) {
      if (socket.rooms.has('room' + i)) {
        fs.appendFile('room' + i + '.txt', "\n" + [msg, socket.username, date].join("\n"), _ => {});
        io.to('room' + i).emit('chat message', msg, socket.username, date);
      }
    }
  });
  socket.on('join room', newRoom => {
    for (let i = 1; i < 4; ++i)
      if (socket.rooms.has('room' + i))
        socket.leave('room' + i);
    fs.readFile(newRoom + '.txt', (_, data) => io.to(socket.id).emit("load messages", data.toString()));
    socket.join(newRoom);
  });
  socket.on('login', (username, password) => {
    if (process.env[username] == password) {
      socket.username = username;
      io.to(socket.id).emit("login success");
    } else
      io.to(socket.id).emit("login failure");
  });
});