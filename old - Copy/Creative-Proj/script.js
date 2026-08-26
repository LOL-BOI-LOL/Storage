const canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');
      config = {
        baseColor: 'black',
        canvasDim: 300,
        godDim: [60, 60],
        godInitPos: [canvas.width/2, 5],
        godIncrmnt: 1,
        playerDim: [70, 70],
        playerInitPos: [canvas.width/2, 225],
        playerIncrmnt: 1,
        boltSize: 0.25,
        boltInitPos: 65,
        boltIncrmnt: 1
      },
      resizeCanvas = () => {
        canvas.width = Math.min(window.innerWidth, window.innerHeight);
        canvas.height = canvas.width;
        config.scale = canvas.width/config.canvasDim;
        drawStrtScrn();
      },
      clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height),
      drawLine = (coords1, coords2, lineW, clr) => {
        ctx.strokeStyle = clr;
        ctx.lineWidth = lineW;
        ctx.beginPath();
        ctx.moveTo(...coords1);
        ctx.lineTo(...coords2);
        ctx.stroke();
      },
      drawRect = (rect, clr) => {
        rect = rect.map(v => v * config.scale);
        ctx.fillStyle = clr;
        ctx.beginPath();
        ctx.rect(...rect);
        ctx.clearRect(...rect);
        ctx.fill();
      },
      random = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min,
      keystates = {};

document.body.onload = () => resizeCanvas();
window.onresize = () => resizeCanvas();

var godPos = config.godInitPos[0],
    playerPos = config.playerInitPos[0],
    godDirct = 1,
    objs = [],
    interval = null,
    timer = 0,
    imgZ = new Image(),
    imgA = new Image(),
    imgB = new Image(),
    imgB2 = new Image();

imgZ.src = 'zeus.png';
imgA.src = 'asclepius.png';
imgB.src = 'sign.png';
imgB2.src = 'background.png';

function start(speed, min, max) {
  godPos = config.godInitPos[0];
  playerPos = config.playerInitPos[0];
  godDirct = 1;
  objs = [];
  interval = null;
  timer = 0;
  interval = setInterval(() => {
    if(objs.some(v => collision(v)))
      end();
    objs.forEach(v => {
      if(v[1] + v[3] >= config.canvasDim + 180 * config.boltSize)
        objs.splice(objs.indexOf(v), 1);
    });
    if(godPos + config.godDim[0] / 2 >= config.canvasDim)
      godDirct = 0;
    else if(godPos - config.godDim[0] / 2 <= 0)
      godDirct = 1;
    if(godDirct)
      godPos += config.godIncrmnt;
    else
      godPos -= config.godIncrmnt;
    if(min == random(max, min))
      objs.push([godPos, config.boltInitPos, config.boltSize * 80, config.boltSize * 180]);
    if(keystates.KeyA)
      if(playerPos - config.playerDim[0] / 2 >= 0)
        playerPos -= config.playerIncrmnt;
    if(keystates.KeyD)
      if(playerPos + config.playerDim[0] / 2 <= config.canvasDim)
        playerPos += config.playerIncrmnt;
    objs.forEach(v => v.splice(1, 1, v[1] + config.boltIncrmnt));
    draw();
    timer += 0.1/speed;
    timer = parseFloat(timer.toFixed(13));
  }, 100/speed);
}

function end() {
  stopInterval();
  interval = true;
  setTimeout(() => {
    drawRoundRect([91 * config.scale, 125 * config.scale], 98 * config.scale, 30 * config.scale, 10 * config.scale, 2, '#3b3a3a', 0, 0, 1);
    ctx.fillStyle = 'black';
    ctx.font = 20 * config.scale + 'px Merienda, cursive';
    ctx.textBaseline = 'middle';
    ctx.fillText('Score: ' + Math.floor(timer), 100 * config.scale, 153 * config.scale, 110 * config.scale);
    console.log(timer + ' seconds');
  }, 100);
  setTimeout(() => {
    drawStrtScrn();
    interval = null;
  }, 5000);
}

function stopInterval() {
  if(interval) {
    clearInterval(interval);
    interval = null;
  }
}

function draw() {
  clearCanvas();
  drawBackground();
  objs.forEach(v => drawBolt([v[0] + 20 * config.boltSize, v[1] + 20 * config.boltSize], config.boltSize, 'black', 'yellow', 1));
  ctx.drawImage(imgZ, (godPos - config.godDim[0] / 2) * config.scale, config.godInitPos[1] * config.scale, ...config.godDim.map(v => v * config.scale));  
  ctx.drawImage(imgA, (playerPos - config.playerDim[0] / 2) * config.scale, config.playerInitPos[1] * config.scale, ...config.playerDim.map(v => v * config.scale));
}

function collision(rect) {
  if(
    playerPos - (config.playerDim[0] * 1 / 3) / 2 < rect[0] + rect[2] &&
    playerPos + (config.playerDim[0] * 7 / 12) / 2 > rect[0] &&
    config.playerInitPos[1] + config.playerDim[1] * 1 / 12 < rect[1] + rect[3] &&
    config.playerInitPos[1] + config.playerDim[1] * 1 / 2 > rect[1]
  )
    return true;
  return false;
}

document.onkeydown = () => {
  if(!keystates[event.code])
    keystates[event.code] = true;
};

document.onkeyup = () => delete keystates[event.code];

canvas.onclick = () => !interval && start(10, 1, 70);

const drawBolt = (pos, size, clrL, clrF, lineW) => {
  ctx.lineWidth = lineW;
  ctx.fillStyle = clrF;
  ctx.strokeStyle = clrL;
  ctx.beginPath();
  ctx.moveTo(pos[0] * config.scale, pos[1] * config.scale);
  ctx.lineTo((pos[0] + 40 * size) * config.scale, (pos[1] - 20 * size) * config.scale);
  ctx.lineTo((pos[0] + 20 * size) * config.scale, (pos[1] + 60 * size) * config.scale);
  ctx.lineTo((pos[0] + 60 * size) * config.scale, (pos[1] + 40 * size) * config.scale);
  ctx.lineTo((pos[0] + 10 * size) * config.scale, (pos[1] + 160 * size) * config.scale);
  ctx.lineTo((pos[0] + 25 * size) * config.scale, (pos[1] + 80 * size) * config.scale);
  ctx.lineTo((pos[0] - 20 * size) * config.scale, (pos[1] + 100 * size) * config.scale);
  ctx.lineTo(pos[0] * config.scale, pos[1] * config.scale);
  ctx.save();
  ctx.clip();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

function drawRoundRect(coords, w, h, r, lineW = 0, clrS = 0, clrF = 0, clip = 0, i = 0) {
  ctx.beginPath();
  ctx.moveTo(coords[0] + r, coords[1]);
  ctx.lineTo(coords[0] + r + w, coords[1]);
  ctx.arc(coords[0] + r + w, coords[1] + r, r, 1.5 * Math.PI, 0);
  ctx.lineTo(coords[0] + 2 * r + w, coords[1] + r + h);
  ctx.arc(coords[0] + r + w, coords[1] + r + h, r, 0, Math.PI / 2);
  ctx.lineTo(coords[0] + r, coords[1] + 2 * r + h);
  ctx.arc(coords[0] + r, coords[1] + r + h, r, Math.PI / 2, Math.PI);
  ctx.lineTo(coords[0], coords[1] + r);
  ctx.arc(coords[0] + r, coords[1] + r, r, Math.PI, 1.5 * Math.PI);
  if(typeof lineW == 'number') {
    ctx.lineWidth = lineW;
  }
  if(clrS) {
    ctx.strokeStyle = clrS;
    ctx.stroke();
  }
  if(clrF) {
    ctx.fillStyle = clrF;
    ctx.save();
    ctx.clip();
    ctx.fill();
    ctx.restore();
  } else if(i) {
    ctx.save();
    ctx.clip();
    ctx.drawImage(imgB, ...coords, w + 2 * r + 2 * lineW, h + 2 * r + 2 * lineW);
    ctx.restore();
  }
  if(clip) {
    ctx.save();
    ctx.clip();
    ctx.clearRect(...coords, w + 2 * r, h + 2 * r);
    ctx.restore();
  }
}

function drawLink(coords, w, h, r, lineW, clrS, clrF, type = 1) {
  coords = coords.map(v => v * config.scale);
  w *= config.scale;
  h *= config.scale;
  r *= config.scale;
  lineW *= config.scale;
  if(type) {
    drawRoundRect(coords, w, h, r, lineW, clrS, clrF);
    drawRoundRect([coords[0] + w / 10, coords[1] + w / 10], w * 4/5, h - w / 5, r, lineW, clrS, 0, 1);
  } else {
    drawRoundRect(coords, w, h, r, lineW, clrS, clrF);
  }
}

function drawBackground() {
  /*
  drawRect([0, 0, 300, 290], 'red');
  drawRect([0, 290, 300, 10], '#155204');
  ctx.fillStyle = '#e3cb17';
  ctx.stokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, canvas.width / 8, 0, Math.PI / 2);
  ctx.stroke();
  ctx.fill();
  */
  ctx.drawImage(imgB2, 0, 0, canvas.width, canvas.height);
}

function drawStrtScrn() {
  stopInterval();
  clearCanvas();
  drawLink([-19, 141], 28, 8, 5, 2, '#3b3a3a', '#666664');
  drawLink([43, 141], 28, 8, 5, 2, '#3b3a3a', '#666664');
  drawLink([278, 141], 28, 8, 5, 2, '#3b3a3a', '#666664');
  drawLink([216, 141], 28, 8, 5, 2, '#3b3a3a', '#666664');
  drawLink([12, 149], 34, 0, 2, 2, '#3b3a3a', '#666664', 0);
  drawLink([74, 149], 34, 0, 2, 2, '#3b3a3a', '#666664', 0);
  drawLink([247, 149], 34, 0, 2, 2, '#3b3a3a', '#666664', 0);
  drawLink([185, 149], 34, 0, 2, 2, '#3b3a3a', '#666664', 0);
  drawRoundRect([100 * config.scale, 126 * config.scale], 80 * config.scale, 28 * config.scale, 10 * config.scale, 2, '#3b3a3a', 0, 0, 1); //'#57120E');
  ctx.fillStyle = 'black';
  ctx.font = 30 * config.scale + 'px Merienda, cursive';
  ctx.textBaseline = 'middle';
  ctx.fillText('Start', 110 * config.scale, 153 * config.scale, 100 * config.scale);
}