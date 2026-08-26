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

document.body.onload = () => resizeCanvas();
window.onresize = () => resizeCanvas();

var interval;

const parab = x => 0.01 * (x - 150) ** 2 + 150;

const draw = (func, time = 10) => {
  if(interval) return null;
  fillCanvas();
  let results;
  let x = 0;
  interval = setInterval(() => {
    results = [canvas.height/2 - func(x), canvas.height/2 - func(x + canvas.width/config.iSize)];
    if(results.some(v => v >= 0 && v <= canvas.height))
      drawLine([x, results[0]], [x + canvas.width/config.iSize, results[1]]);
    x += canvas.width/config.iSize;
    if(x > canvas.width) {
      stopInterval();
      slowClear(func, time);
    }
  }, time);
}

const slowClear = (func, time = 10) => {
  if(interval) return null;
  let x = 0;
  interval = setInterval(() => {
    ctx.clearRect(x, 0, canvas.width/config.iSize, canvas.height);
    x += canvas.width/config.iSize;
    if(x > canvas.width) {
      stopInterval();
      draw(func, time);
    }
  }, time);
}

const stopInterval = () => {
  clearInterval(interval);
  interval = null;
};

const drawLine = (coord1, coord2, pattern = []) => {
  ctx.setLineDash(pattern);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(...coord1);
  ctx.lineTo(...coord2);
  ctx.stroke();
}

//draw(x => Math.sin(x/10) * 30, 10);
//draw(x => (x%10)**(x/100)**((-x+200)/30), 10); 
//draw(x => ((x + 30)/30)**(Math.sin(x/7)+1), 10);
//draw(x => (x%50.9102)^(x%30.1292), 10);
draw(x => ((x+25.91)%21.97)^((x+25.91)%41.59), 10);