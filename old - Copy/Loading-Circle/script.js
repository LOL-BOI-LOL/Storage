const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const resizeCanvas = () => {
  if(window.innerWidth <= window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
  } else {
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;
  }
  clearCanvas();
}

const clearCanvas = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.onresize = resizeCanvas;
document.body.onload = resizeCanvas;

var curRotation = 0;
var color = 0;

const toRad = deg => deg*Math.PI/180;

const toggleColor = () => color = !color;

const drawArc = (clr, w, x, y, r, sr, er) => {
  ctx.beginPath();
  ctx.strokeStyle = clr;
  ctx.lineWidth = w;
  ctx.arc(x, y, r, sr, er);
  ctx.stroke();
}

const rotate = () => {
  if(curRotation > 360) {
    toggleColor();
    curRotation = 0;
  }
  clearCanvas();
  if(color) {
    drawArc('black', canvas.width*1/78, canvas.width/2, canvas.height/2, canvas.width*1/8, 0 + toRad(curRotation), toRad(360));
    drawArc('white', canvas.width*1/78, canvas.width/2, canvas.height/2, canvas.width*1/8, 0, toRad(curRotation));
  } else {
    drawArc('black', canvas.width*1/78, canvas.width/2, canvas.height/2, canvas.width*1/8, 0, toRad(curRotation));
  }
  curRotation++;
}

setInterval(rotate, 10);