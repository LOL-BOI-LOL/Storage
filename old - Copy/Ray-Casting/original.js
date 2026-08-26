const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const size = 4000;
const config = {
  res: 1,
  fov: 60,
  framerate: 60
}
const movei = 27/config.framerate;
const rotatei = 35/config.framerate;
var objects = [
  [0,0,500,5],
  [495,5,5,190],
  [0,195,500,5],
  [0,5,5,190],
  [400,50,5,100],
  [300,50,5,100],
  [200,75,50,50]
];
var objects2 = [
  [50,100,5],
  [50,50,5],
  [50,150,5],
  [50,75,5],
  [50,125,5]
];
const sizecanvas = () => {
  if(window.innerWidth <= window.innerHeight && window.innerWidth <= 300) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
  } else if(window.innerWidth <= 300) {
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;
  } else {
    canvas.width = 400;
    canvas.height = 400;
  }
  render();
};
const gradient = (x1, y1, x2, y2, colors) => {
  let grad = ctx.createLinearGradient(x1, y1, x2, y2);
  colors.forEach((color, i) => {
    grad.addColorStop((i + 1) / colors.length, color);
  });
  return grad;
};
const toRad = deg => deg * Math.PI / 180;
const dist = (coords1, coords2) => Math.sqrt((coords1[0] - coords2[0])**2 + (coords1[1] - coords2[1])**2);
const rotate = (angle, i) => {
  angle += i;
  if(angle > 180) {
    angle = -(180 - (angle - 180));
  } else if(angle <= -180) {
    angle = 180 + (angle + 180);
  }
  return angle;
};
const keystates = {
  w: false,
  s: false,
  a: false,
  d: false,
  q: false,
  e: false
};
var playerpos = [100, 100];
var playerangle = 0;

window.onresize = sizecanvas;

document.onkeydown = e => { keystates[e.key] = true; }

document.onkeyup = e => { keystates[e.key] = false; }

function keyfunc() {
  let keys = [
    ['w', 's', () => { move(movei, playerangle) }],
    ['s', 'w', () => { move(-movei, playerangle) }],
    ['a', 'd', () => { move(movei, rotate(playerangle, 90)) }],
    ['d', 'a', () => { move(movei, rotate(playerangle, -90)) }],
    ['q', 'e', () => { playerangle = rotate(playerangle, rotatei); render(); }],
    ['e', 'q', () => { playerangle = rotate(playerangle, -rotatei); render(); }],
  ];
  keys.forEach((k) => {
    if(keystates[k[0]] && !keystates[k[1]]) {
      k[2]();
    }
  });
}

function move(steps, angle) {
  let xi = steps * Math.cos(toRad(angle));
  let yi = steps * Math.sin(toRad(angle));
  if(xi == 0 && yi == 0) {
    xi = Math.abs(steps);
  }
  let tempcoord = playerpos[0] + xi;
  if(!collisionrect([tempcoord - 2.5, playerpos[1] - 2.5, 5, 5])) {
    playerpos[0] = tempcoord;
  }
  tempcoord = playerpos[1] + yi;
  if(!collisionrect([playerpos[0] - 2.5, tempcoord - 2.5, 5, 5])) {
    playerpos[1] = tempcoord;
  }
  render();
}

function collisionpoint(coords) {
  let colliding = false;
  objects.forEach(o => {
    if(coords[0] >= o[0] && coords[0] <= o[0] + o[2] && coords[1] >= o[1] && coords[1] <= o[1] + o[3]) {
      colliding = true;
    }
  });
  objects2.forEach(o => {
    if(Math.sqrt((coords[0]-o[0])**2 + (coords[1]-o[1])**2) <= o[2]) {
      colliding = true;
    }
  });
  return colliding;
}

function collisionrect(rect) {
  let colliding = false;
  objects.forEach(o => {
    let collisionloc = [false, false];
    if((rect[0] >= o[0] && rect[0] <= o[0] + o[2]) || (rect[0] + rect[2] >= o[0] && rect[0] + rect[2] <= o[0] + o[2])) {
      collisionloc[0] = true;
    } else if((o[0] >= rect[0] && o[0] <= rect[0] + rect[2]) || (o[0] + o[2] >= rect[0] && o[0] + o[2] <= rect[0] + rect[2])) {
      collisionloc[0] = true;
    }
    if((rect[1] >= o[1] && rect[1] <= o[1] + o[3]) || (rect[1] + rect[3] >= o[1] && rect[1] + rect[3] <= o[1] + o[3])) {
      collisionloc[1] = true;
    } else if((o[1] >= rect[1] && o[1] <= rect[1] + rect[3]) || (o[1] + o[3] >= rect[1] && o[1] + o[3] <= rect[1] + rect[3])) {
      collisionloc[1] = true;
    }
    if(collisionloc[0] && collisionloc[1]) {
      colliding = true;
    }
  });
  objects2.forEach(o => {
    let collisionloc = [false, false];
    if(o[0] >= rect[0] && o[0] <= rect[0] + rect[2] && o[1] >= rect[1] && o[1] <= rect[1] + rect[3]) {
      colliding = true;
    } else {
      if((rect[0] >= o[0] - o[2] && rect[0] <= o[0] + o[2]) || (rect[0] + rect[2] >= o[0] - o[2] && rect[0] + rect[2] <= o[0] + o[2])) {
        collisionloc[0] = true;
      }
      if((rect[1] >= o[1] - o[2] && rect[1] <= o[1] + o[2]) || (rect[1] + rect[3] >= o[1] - o[2] && rect[1] + rect[3] <= o[1] + o[2])) {
        collisionloc[1] = true;
      }
      if(collisionloc[0] && collisionloc[1] && (dist([rect[0], rect[1]], [o[0], o[1]]) <= 5 || dist([rect[0], rect[1]], [o[0], o[1]]) <= 5 || dist([rect[0] + rect[2], rect[1]], [o[0], o[1]]) <= 5 || dist([rect[0], rect[1] + rect[3]], [o[0], o[1]]) <= 5 || dist([rect[0] + rect[2], rect[1] + rect[3]], [o[0], o[1]]) <= 5)) {
        colliding = true;
      } else if(collisionloc[0] && !collisionloc[1] && o[1] <= rect[1] && o[1] >= rect[1] + rect[3]) {
        colliding = true;
      } else if(!collisionloc[0] && collisionloc[1] && o[0] <= rect[0] && o[0] >= rect[0] + rect[2]) {
        colliding = true;
      }
    }
  });
  return colliding;
}

function render() {
  let angle = rotate(playerangle, config.fov/2);
  let gradient1 = gradient(0,0,0,canvas.height/2, ['gray','black']);
  let gradient2 = gradient(0,canvas.height,0,canvas.height/2, ['gray','black']);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = gradient1;
  ctx.fillRect(0,0,canvas.width,canvas.height/2);
  ctx.fillStyle = gradient2;
  ctx.fillRect(0,canvas.height/2,canvas.width,canvas.height/2);
  for(let i = 0; i < canvas.width/config.res; ++i) {
    let x = playerpos[0];
    let y = playerpos[1];
    let xi = 0.5 * Math.cos(toRad(angle));
    let yi = 0.5 * Math.sin(toRad(angle));
    while(!(collisionpoint([x,y]))) {
      x += xi;
      y += yi;
    }
    while(collisionpoint([x,y])) {
      x -= xi * 0.1;
      y -= yi * 0.1;
    }
    let dist = Math.sqrt((x - playerpos[0])**2 + (y - playerpos[1])**2) * Math.cos(Math.abs(toRad(playerangle-angle)));
    let height = 2 * (size / dist);
    let color = Math.floor(255 * height/400);
    color = color > 190 ? 190 : color;
    ctx.fillStyle = "rgb(" + 0 + ',' + 0 + ',' + color + ")";
    ctx.fillRect(config.res*i, (canvas.height-height)/2, config.res, height);
    angle = rotate(angle, -config.fov/(canvas.width/config.res));
  }
  ctx.fillStyle = 'white';
  ctx.fillRect(canvas.width/2-5, canvas.height/2-.5, 10, 1);
  ctx.fillRect(canvas.width/2-.5, canvas.height/2-5, 1, 10);
}

setInterval(keyfunc, 1000/config.framerate);