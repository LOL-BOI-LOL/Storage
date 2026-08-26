const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const config = {
  cooldownTime: 0.15,
  baseColor: 'black',
  gridSize: 11,
  gridColor: 'white',
  playerColor: 'blue',
  wallColor: 'lightgray'
};

var playerpos = [5, 5];
var cooldownState = 0;

document.onkeydown = () => {
  let temp = playerpos.slice();
  if(event.key == 'w')
    playerpos[1] -= 1;
  else if(event.key == 's')
    playerpos[1] += 1;
  else if(event.key == 'a')
    playerpos[0] -= 1;
  else if(event.key == 'd')
    playerpos[0] += 1;
  if(
    temp != playerpos &&
    !objects.some(v => collisionPoint(playerpos, v)) &&
    (
      playerpos[0] > 0 &&
      playerpos[0] < config.gridSize - 1 &&
      playerpos[1] > 0 &&
      playerpos[1] < config.gridSize - 1
    ) &&
    !cooldownState
  ) {
    drawBoxes();
    cooldownState = 1;
    setTimeout(() => cooldownState = 0, config.cooldownTime * 1000);
  } else
    playerpos = temp.slice();
};

const collisionPoint = (point, rect) => 
  point[0] >= rect[0] &&
  point[0] + 1 <= rect[0] + rect[2] &&
  point[1] >= rect[1] &&
  point[1] + 1 <= rect[1] + rect[3];

const walls = [
  [0, 0, config.gridSize, 1],
  [0, config.gridSize - 1, config.gridSize, 1],
  [0, 0, 1, config.gridSize],
  [config.gridSize - 1, 0, 1, config.gridSize]
];

const objects = [
  
];

const resizeCanvas = () => {
  canvas.width = Math.min(window.innerWidth, window.innerHeight);
  canvas.height = canvas.width;
  drawBoxes();
}

const fillCanvas = () => {
  ctx.fillStyle = config.baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const drawGrid = () => {
  let dim = canvas.width / config.gridSize;
  ctx.strokeStyle = config.gridColor;
  ctx.lineWidth = canvas.width / (10*config.gridSize);
  for(let x = 0; x < config.gridSize; ++x) {
    for(let y = 0; y < config.gridSize; ++y) {
      ctx.strokeRect(x * dim, y * dim, dim, dim);
    }
  }
}

const drawBoxes = () => {
  fillCanvas();
  let dim = canvas.width / config.gridSize;
  ctx.strokeStyle = config.wallColor;
  ctx.lineWidth = canvas.width / (10*config.gridSize);
  walls.forEach(v => {
    for(let x = 0; x < v[2]; ++x)
      for(let y = 0; y < v[3]; ++y)
        ctx.strokeRect((v[0] + x) * dim, (v[1] + y) * dim, dim, dim);
  });
  ctx.strokeStyle = config.playerColor;
  ctx.lineWidth = canvas.width / (15*config.gridSize);
  ctx.strokeRect((0.2 + playerpos[0]) * dim, (0.2 + playerpos[1]) * dim, 0.6 * dim, 0.6 * dim);
}

document.body.onload = () => resizeCanvas();
window.onresize = () => resizeCanvas();