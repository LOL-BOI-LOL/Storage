var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  if(req.url == '/reset') {
    fs.readFile('arcade.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data.toString().split('fetchBalance();\n      restock();')[0] + 'localStorage.setItem("Balance",btoa(1000));fetchBalance();restock();</script></body></html>');
      res.end();
    })
  } else {
    fs.readFile('arcade.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    })
  }
}).listen(8080);