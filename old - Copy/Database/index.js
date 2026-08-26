const http = require('http');
var data = [];

http.createServer((req, res) => {
  res.write('Hello World!');
  res.end();
}).listen(8080);