const letters = 'abcdedfghijklmnopqrstuvwxyz'.split('');
const output = document.getElementById('o');
const btn = document.getElementById('btn');
var strInfo;

btn.onclick = () => { strInfo = new getVal; output.innerHTML = strInfo.estr; };

class getVal {
  constructor() {
    this.str = document.getElementById('str').value;
    this.i = parseInt(document.getElementById('i').value, 10);
    this.m = parseInt(document.getElementById('m').value, 10);
    this.mi = parseInt(document.getElementById('mi').value, 10);
    this.estr = this.str.toLowerCase().split('').map((c, ind) => letters[this.conditional(letters.indexOf(c) + this.i * (this.m + this.mi * ind))]).join('');
  }
  conditional(op) {
    return op >= 27 ? op - 27 : op;
  }
}