const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const resizeCanvas = () => {
  canvas.width = Math.min(window.innerWidth, window.innerHeight);
  canvas.height = canvas.width;
  fillCanvas();
}

const fillCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.body.onload = () => resizeCanvas();
window.onresize = () => resizeCanvas();
/*
const draw = (coords, clr, r) => {
  ctx.fillStyle = clr;
  ctx.beginPath();
  ctx.arc(coords[0], coords[1], r, 0, 2*Math.PI);
  ctx.fill();
};

var x = {
  x: 0,
  i: 0,
  e: 1,
  clr: 'white',
  r: 5
};

setInterval(() => {
  draw([x.x + 50, x.e * Math.sin(x.x/25) * 25 + canvas.height/2], x.clr, x.r);
  if(x.x > Math.PI * 50) {
    x.e = -1;
    x.i = 1;
  } else if(x.x < 0) {
    x.e = 1;
    x.i = 0;
    if(x.clr == 'white') {
      x.clr = 'black';
      x.r = 6;
    } else { 
      x.clr = 'white';
      x.r = 5;
    }
  }
  if(x.i)
    x.x -= 1/10 * Math.PI;
  else
    x.x += 1/10 * Math.PI;
}, 1);
*/

const draw = (xy, a, clr, w) => {
  fillCanvas();
  a = a.map(v => v*Math.PI/180);
  ctx.strokeStyle = clr;
  ctx.lineWidth = w;
  ctx.beginPath();
  ctx.ellipse(...xy, 50, 30, 0, Math.min(...a), Math.max(...a));
  ctx.stroke();
};

var a = {
  sa: 180,
  a: 210,
  d: false,
  c: false,
  clr: 'white',
  w: 3,
  counter: 1
};
/*
setInterval(() => {
  if(!a.c)
    draw([100, 50], [a.sa, a.a], a.clr);
  else
    draw([200, 50], [a.sa, a.a], a.clr);
  if(a.a == 0 || a.a == 180) {
    ++a.counter;
    if(!a.d && !a.c) {
      if(a.counter > 1) {
        a.c = !a.c;
        a.d = !a.d;
        a.sa = 180;
        a.a = 150;
        a.counter = 0;
      }
    } else if(a.d && a.c) {
      if(a.counter > 1) {
        a.c = !a.c;
        a.d = !a.d;
        a.sa = 0;
        a.a = 30;
        a.counter = 0;
      }
    }
  }
  if(a.d) {
    --a.a;
    --a.sa;
  } else {
    ++a.a;
    ++a.sa;
  }
  if(a.a >= 360)
    a.a -= 360;
  else if(a.a < 0)
    a.a += 360;
  if(a.sa >= 360)
    a.sa -= 360;
  else if(a.sa < 0)
    a.sa += 360;
}, 100);
*/