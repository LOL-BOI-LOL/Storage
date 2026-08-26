const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const config = {
  baseColor: 'black'
};

const resizeCanvas = () => {
  canvas.width = Math.min(window.innerWidth, window.innerHeight);
  canvas.height = canvas.width;
  fillCanvas();
}

const fillCanvas = () => {
  ctx.fillStyle = config.baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

document.body.onload = () => resizeCanvas();
window.onresize = () => resizeCanvas();

var points = [[10, 10], [100, 50], [200, 5], [50, 100]];

const drawLine = (coord1, coord2) => {
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(...coord1);
  ctx.lineTo(...coord2);
  ctx.stroke();
}

const drawPoint = coord1 => {
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(...coord1, 5, 0, 2 * Math.PI);
  ctx.fill();
}

const solve = () => {
  fillCanvas();
  points.forEach(v => drawPoint(v));
  let pointsCopy = points.slice(1, points.length);
  let curPoint = points[0];
  while(pointsCopy.length) {
    let dists = pointsCopy.map(v => [Math.hypot(...curPoint, ...v), v]);
    dists = dists[dists.map(v => v[0]).indexOf(Math.min(...dists.map(v => v[0])))][1];
    drawLine(curPoint, dists);
    curPoint = dists;
    pointsCopy.splice(pointsCopy.indexOf(curPoint), 1);
  }
}