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
  loadDaWheel(initialAngle);
}

const clearCanvas = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.onresize = resizeCanvas;
document.body.onload = resizeCanvas;

const sections = ['blue', 'red', 'pink', 'white', 'gray'];

var initialAngle = 0;
var interval;

const randColor = () => Math.floor(Math.random()*16777215).toString(16);

const appendRandColors = amount => {
  for(let i = 0; i < amount; i++)
    sections.push('#'+randColor());
  loadDaWheel(initialAngle);
}

const randNum = (min, max, place) => Math.floor((Math.random()*(max-min)+min+1/place)*place)/place;

const toRad = deg => deg*Math.PI/180;

function spinDaWheel(time, angleIncrement = randNum(5,12, 100000)) {
  time *= 1000;
  let tempAngle = initialAngle;
  let i = 0;
  interval = setInterval(() => {
    i += 10;
    tempAngle += angleIncrement - angleIncrement * i/time;
    if(tempAngle >= 360)
      tempAngle -= 360;
    loadDaWheel(tempAngle);
    if(i >= time)
      results(tempAngle, interval)
  }, 10);
}

function results(angle, interval) {
  clearInterval(interval);
  let result = 'Inbetween';
  sections.forEach((v, i) => {
    if(angle > i*360/sections.length && angle < (i+1)*360/sections.length)
      result = sections[sections.length - 1 - i];
  });
  initialAngle = angle;
  ctx.textAlign = 'center';
  ctx.font = '30px Ariel';
  ctx.fillText(result.toUpperCase(), canvas.width/2, canvas.height/8, canvas.width);
}

function loadDaWheel(angle) {
  let xy = canvas.width/2;
  let r = canvas.width/3;
  clearCanvas();
  sections.forEach((v, i) => {
    drawSection(xy, xy, r, angle+i*(360/sections.length), angle+(i+1)*(360/sections.length), v);
  });
  drawPointer();
}

const drawPointer = () => {
  ctx.lineWidth = 0;
  ctx.fillStyle = 'black';
  let x = 5*canvas.width/6 + canvas.width/24;
  ctx.beginPath();
  ctx.moveTo(x, canvas.width/2);
  ctx.lineTo(x + canvas.width/25, canvas.width/2 - canvas.width/50);
  ctx.lineTo(x + canvas.width/25, canvas.width/2 + canvas.width/50);
  ctx.lineTo(x, canvas.width/2);
  ctx.fill();
  ctx.stroke();
}

const drawSection = (x, y, r, rs, re, c) => {
  rs = toRad(rs);
  re = toRad(re);
  ctx.lineWidth = 2;
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x+r*Math.cos(rs), y+r*Math.sin(rs));
  ctx.arc(x, y, r, rs, re);
  ctx.moveTo(x, y);
  ctx.lineTo(x+r*Math.cos(re), y+r*Math.sin(re));
  ctx.fill();
  ctx.stroke();
}

canvas.onclick = () => spinDaWheel(5);
document.onkeydown = (e) => {
  if(e.keyCode == 32)
    spinDaWheel(5);
};