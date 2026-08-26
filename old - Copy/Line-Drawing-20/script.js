const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const config = {
  baseColor: 'black',
  iSize: 1000,
  toggle: 0
};

const resizeCanvas = () => {
  canvas.width = Math.min(window.innerWidth, window.innerHeight);
  canvas.height = canvas.width;
  fillCanvas();
}

const fillCanvas = () => {
  ctx.fillStyle = config.baseColor;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.body.onload = () => resizeCanvas();
window.onresize = () => resizeCanvas();

var interval;

const drawScrn = scrn => {
  fillCanvas();
  let modi = canvas.width/2;
  if(config.toggle)
    modi += scrn[scrn.length-1][1];
  scrn.forEach((v, i) => drawLine([i - 1, modi-v[0]], [i, modi-v[1]]));
};

const draw = (func, time = 10) => {
  if(interval) return null;
  let screen = [];
  let x = 0;
  interval = setInterval(() => {
    if(x >= canvas.width**2/config.iSize)
      screen.shift();
    screen.push([func(x - 1), func(x)]);
    drawScrn(screen);
    x += canvas.width/config.iSize;
  }, time);
};

const stopInterval = () => {
  clearInterval(interval);
  interval = '';
};

const drawLine = (coord1, coord2, pattern = [1, 1]) => {
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
//draw(x => (x%50.9102)^(x%30.1292), 1);
draw(x => ((x+25.91)%21.97)^((x+25.91)%41.59), 5);