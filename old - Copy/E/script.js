function newm() {
  var m = document.getElementById('newm');
  var fs = require('fs');
  datajson = fs.readfile('room1.json',json,'utf8',callback);
  data = JSON.parse(datajson);
}
function displaym() {
  var fs = require('fs');
  datajson = fs.readfile('room1.json',json,'utf8',data);
  data = JSON.parse(datajson);
  document.getElementById('chat').innerHTML = data;
}
displaym()