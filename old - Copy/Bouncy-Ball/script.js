const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const config = {
  baseColor: 'black',
  iSize: 1000,
  bouncy: 0.9,
  radi: 15
};

const resizeCanvas = () => {
  canvas.width = Math.min(window.innerWidth, window.innerHeight);
  canvas.height = canvas.width;
  fillCanvas();
}

const fillCanvas = (coords = [canvas.width, canvas.height]) => {
  ctx.fillStyle = config.baseColor;
  ctx.clearRect(0, 0, ...coords);
}

const stopInterval = () => {
  clearInterval(interval);
  interval = null;
};

const toRad = deg => deg * Math.PI / 180;

const drawLine = (coord1, coord2, pattern = []) => {
  ctx.setLineDash(pattern);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(...coord1);
  ctx.lineTo(...coord2);
  ctx.stroke();
}

const drawCirc = loc => {
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(...loc, config.radi, 0, Math.PI * 2);
  ctx.fill();
}

const draw2 = (func, time = 10) => {
  if(interval) return null;
  fillCanvas();
  let results;
  let t = 0;
  interval = setInterval(() => {
    fillCanvas([canvas.width, canvas.height*2/3]);
    results = func(t);
    if(canvas.height*2/3 - results[1] < config.radi) {
      t = 0;
      results[1] = canvas.height*2/3 - config.radi;
    }
    drawCirc(results);
    drawLine([0, canvas.height*2/3], [canvas.width, canvas.height*2/3]);
    t += time/600;
  }, time);
}

class Info {
  constructor(a, v, h, x) {
    this.a = a + 180;
    while(this.a >= 180) this.a -= 180;
    this.h = h;
    this.v = v;
    this.bufferx = x;
  }
  get rad() { return toRad(this.a) };
  get sin() { return Math.sin(this.rad) };
  get cos() { return Math.cos(this.rad) };
  get tan() { return Math.tan(this.rad) };
  get vx() { return this.v * this.cos };
  get vy() { return this.v * this.sin };
}

Info.prototype.g = 1000;

var interval;
var info = new Info(45, 300, config.radi, config.radi);

document.body.onload = () => resizeCanvas();
window.onresize = () => resizeCanvas();

draw2(t => {
  let y = info.h + info.vy * t - info.g * t ** 2 / 2;
  let x = info.vx * t + info.bufferx;
  if(y < config.radi) {
    let temp = Math.atan(-(info.v * info.sin - info.g * t) / info.vx) * 180 / Math.PI + 180;
    if(temp >= 180) temp -= 180;
    info.a = temp;
    info.v = info.v * config.bouncy;
    info.h = config.radi;
    info.bufferx = x;
  }
  if(x > canvas.width + config.radi)
    info.bufferx -= canvas.width + 2 * config.radi;
  else if(x < -config.radi)
    info.bufferx += canvas.width + 2 * config.radi;
  if(info.v <= 0.1)
    stopInterval();
  return [x, 2*canvas.height/3 - y];
}, 10);