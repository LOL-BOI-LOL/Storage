const http       = require('http'),
      express    = require('express'),
      app        = express(),
      server     = http.createServer(app),
      { Server } = require("socket.io"),
      io         = new Server(server),
      rooms      = {
        1: [{}, -1, [[0, 0, 0], [0, 0, 0], [0, 0, 0]], false],
        2: [{}, -1, [[0, 0, 0], [0, 0, 0], [0, 0, 0]], false],
        3: [{}, -1, [[0, 0, 0], [0, 0, 0], [0, 0, 0]], false],
        4: [{}, -1, [[0, 0, 0], [0, 0, 0], [0, 0, 0]], false],
        5: [{}, -1, [[0, 0, 0], [0, 0, 0], [0, 0, 0]], false],
        6: [{}, -1, [[0, 0, 0], [0, 0, 0], [0, 0, 0]], false],
        7: [{}, -1, [[0, 0, 0], [0, 0, 0], [0, 0, 0]], false],
        8: [{}, -1, [[0, 0, 0], [0, 0, 0], [0, 0, 0]], false],
        9: [{}, -1, [[0, 0, 0], [0, 0, 0], [0, 0, 0]], false]
      },
      checkBoard = num => {
        let board = rooms[num][2];
        sums = [0, 0, 0, 0, 0, 0, 0, 0];
        [0, 1, 2].forEach(v => {
          [0, 1, 2].forEach(i => {
            sums[v] += board[i][v];
            sums[v + 3] += board[v][i];
          });
          sums[6] += board[v][v];
          sums[7] += board[2 - v][v];
        });
        let res = null;
        sums.forEach((v, i) => {
          if (i < 3 && (v == 3 || v == -3))
            res = [i, 0, i, 2, 0];
          else if (i < 6 && (v == 3 || v == -3))
            res = [0, i - 3, 2, i - 3, 1];
          else if (v == 3 || v == -3)
            res = [0, 2 * (i - 6), 2, 2 - 2 * (i - 6), 2 + i - 6];
        });
        return res;
      };

app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));

server.listen(3000);

io.on("connection", (socket) => {
  socket.roomNum = 0;
  
  socket.on("join room", () => {
    if (socket.roomNum) return;
    check = 0;
    for (i = 1; i < 10; ++i) {
      let len = Object.keys(rooms[i][0]).length;
      if (len > 1 || rooms[i][3]) {
        continue;
      } else if (len == 0 || (len == 1 && Object.entries(rooms[i][0])[0][1] == 1)) {
        rooms[i][0][socket.id] = -1;
        check = i;
        break;
      } else {
        rooms[i][0][socket.id] = 1;
        check = i;
        break;
      }
    }
    if (!check) {
      io.to(socket.id).emit("join fail");
      return;
    }
    socket.join("room" + check);
    socket.roomNum = check;
    io.to(socket.id).emit("join success");
    rooms[check][2].forEach((arr, c) => {
      arr.forEach((val, r) => {
        if (val)
          io.to(socket.id).emit("update", r, c, val);
      });
    });
    res = checkBoard(check);
    if (res)
      io.to(socket.id).emit("win", ...res);
    else if (!rooms[socket.roomNum][2].some(arr => arr.some(v => v == 0)))
      io.to(socket.id).emit("tie");
  });
  
  socket.on("play", (x, y) => {
    if (rooms[socket.roomNum][3]) return;
    let player = rooms[socket.roomNum][0][socket.id];
    if (!rooms[socket.roomNum][2][y][x] && player == rooms[socket.roomNum][1]) {
      rooms[socket.roomNum][1] -= player * 2;
      rooms[socket.roomNum][2][y][x] = player;
      io.to("room" + socket.roomNum).emit("update", x, y, player);
      res = checkBoard(socket.roomNum);
      if (res) {
        rooms[socket.roomNum][3] = true;
        io.to("room" + socket.roomNum).emit("win", ...res);
      } else {
        if (!rooms[socket.roomNum][2].some(arr => arr.some(v => v == 0))) {
          rooms[socket.roomNum][3] = true;
          io.to("room" + socket.roomNum).emit("tie");
        }
      }
    }
  });

  socket.on("leave room", () => {
    socket.leave("room" + socket.roomNum);
    delete rooms[socket.roomNum][0][socket.id];
    if (Object.keys(rooms[socket.roomNum][0]).length == 0) {
      rooms[socket.roomNum][1] = -1;
      rooms[socket.roomNum][2] = rooms[socket.roomNum][2].map(arr => [0, 0, 0]);
      rooms[socket.roomNum][3] = false;
    }
    socket.roomNum = 0;
  });

  socket.on("disconnect", () => {
    if (socket.roomNum == 0) return;
    socket.leave("room" + socket.roomNum);
    if (rooms[socket.roomNum][0][socket.id]) {
      delete rooms[socket.roomNum][0][socket.id];
      if (Object.keys(rooms[socket.roomNum][0]).length == 0) {
        rooms[socket.roomNum][1] = -1;
        rooms[socket.roomNum][2] = rooms[socket.roomNum][2].map(arr => [0, 0, 0]);
        rooms[socket.roomNum][3] = false;
      }
      socket.roomNum = 0;
    }
  });
});