const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const config = {
  baseColor: 'black',
  tIncrement: 1 / 100,
  bouncy: 0.9,
  standardRadi: [10, 5],
  time: 10,
  projectileCooldown: 50
};

const keyStates = {
  a: 0,
  d: 0,
  q: 0,
  e: 0,
  space: 0
};

const resizeCanvas = () => {
  canvas.width = Math.min(window.innerWidth, window.innerHeight);
  canvas.height = canvas.width;
  fillCanvas();
}

const fillCanvas = (coords = [canvas.width, canvas.height]) => {
  ctx.fillStyle = config.baseColor;
  ctx.clearRect(0, 0, ...coords);
  ctx.fillRect(0, 0, ...coords);
}

const stopInterval = () => {
  clearInterval(interval);
  interval = null;
};

const toRad = deg => deg * Math.PI / 180;

const drawLine = (coord1, coord2, size) => {
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(coord1[0], canvas.height - coord1[1]);
  ctx.lineTo(coord2[0], canvas.height - coord2[1]);
  ctx.stroke();
}

const drawRectangle = (center, w, h, angle) => {
  ctx.save();
  ctx.translate(center[0], canvas.height - center[1]);
  ctx.rotate(toRad(angle));
  ctx.fillStyle = 'blue';
  ctx.fillRect(-w/2, h/2, w, -h);
  ctx.restore();
};

const drawCirc = (loc, radi, clr = 'blue') => {
  ctx.fillStyle = clr;
  ctx.beginPath();
  ctx.arc(loc[0], canvas.height - loc[1], radi, 0, Math.PI * 2);
  ctx.fill();
}

var interval;

document.body.onload = () => resizeCanvas();
window.onresize = () => resizeCanvas();

const fixNum = num => parseFloat(num.toFixed(13));

const fixAngle = (x, y) => {
  let result = fixNum(Math.abs(Math.atan(y / x) * 180 / Math.PI));
  if(y < 0 && x < 0)
    result = 270 - result;
  else if(y < 0)
    result = 360 - result;
  else if(x < 0)
    result = 180 - result;
  return result;
};

class Stationary {
  constructor(coords, radi, isPlayer) {
    this.coords = coords;
    this.playerRadi = config.standardRadi[0];
    this.isPlayer = isPlayer;
    if(this.isPlayer) {
      this.projectiles = [];
      this.maxBounces = 8;
      this.projectileRadi = config.standardRadi[1];
      this.wallLooped = 0;
      this.projectileGravity = 170;
      this.cooldown = 0;
      this.cooldownMulti = 1;
      this.direction = 45;
      this.powerMulti = 1;
    }
  }

  createProjectile() {
    this.projectiles.push(new Projectile(
      this,
      0, 
      this.projectileRadi,
      this.direction,
      300,
      this.coords.map((v, i) => v + Math[['cos', 'sin'][i]](toRad(this.direction)) * (this.playerRadi + 10)),
      this.projectileGravity,
      this.maxBounces,
      this.wallLooped
    ));
  }
};

class Projectile {
  constructor(player, time, radi, angle, velocity, offsets, gravity, maxBounces, wallLoop) {
    this.time = time;
    this.radi = radi;
    this.angle = angle;
    this.velocity = velocity;
    this.xOffset = offsets[0];
    this.yOffset = offsets[1];
    this.gravity = gravity;
    this.maxBounces = maxBounces;
    this.numBounces = 0;
    this.wallLoop = wallLoop;
    this.player = player;
  }
  
  get rad() { return fixNum(this.angle * Math.PI / 180); }
  get sin() { return fixNum(Math.sin(this.rad)); }
  get cos() { return fixNum(Math.cos(this.rad)); }
  get tan() { return fixNum(Math.tan(this.rad)); }
  get xV() { return this.velocity * this.cos; }
  get yV() { return this.velocity * this.sin; }
  get pos() { return [this.xV * this.time + this.xOffset, this.yOffset + this.yV * this.time - this.gravity * this.time ** 2 / 2]; }
  
  isCollide(thing) {
    if(!(thing instanceof Stationary || thing instanceof Projectile)) throw new TypeError('To detect collision both objects must either be a projectile or stationary object.');
    return Math.hypot(this.coords[0] - thing.coords[0], this.coords[1] - thing.coords[1]) <= this.radi + thing.radi;
  }

  checkLoopWall() {
    if(!this.wallLoop) return null;
    if(this.pos[0] > canvas.width + this.radi)
      this.xOffset -= canvas.width + 2 * this.radi;
    else if(this.pos[0] < -this.radi)
      this.xOffset += canvas.width + 2 * this.radi;
  }

  checkBounce() {
    let temps = [];
    temps[0] = this.pos[0];
    temps[1] = this.pos[1];
    temps[2] = this.sin;
    temps[3] = this.xV;
    if(!this.wallLoop) {
      if(this.maxBounces) {
        if(this.pos[0] + this.radi > canvas.width) {
          this.angle = fixAngle(-this.xV, this.velocity * this.sin - this.gravity * this.time);
          this.velocity = Math.hypot(temps[3], this.velocity * temps[2] - this.gravity * this.time) * config.bouncy;
          this.time = 0;
          this.yOffset = temps[1];
          this.xOffset = canvas.width - this.radi;
          this.numBounces += 1;
        } else if(this.pos[0] - this.radi < 0) {
          this.angle = fixAngle(-this.xV, this.velocity * this.sin - this.gravity * this.time);
          this.velocity = Math.hypot(temps[3], this.velocity * temps[2] - this.gravity * this.time) * config.bouncy;
          this.time = 0;
          this.yOffset = temps[1];
          this.xOffset = this.radi;
          this.numBounces += 1;
        }
      } else if(this.pos[0] <= -this.radi || this.pos[0] >= canvas.width + this.radi) {
        return 1;
      }
    }
    if(this.pos[1] < this.radi) {
      if(this.maxBounces) {
        this.angle = fixAngle(this.xV, -(this.velocity * this.sin - this.gravity * this.time));
        this.velocity = Math.hypot(temps[3], this.velocity * temps[2] - this.gravity * this.time) * config.bouncy;
        this.time = 0;
        this.yOffset = this.radi;
        this.xOffset = temps[0];
        this.numBounces += 1;
      } else if(this.pos[1] < -this.radi) {
        return 1;
      }
    }
    if(this.numBounces >= this.maxBounces)
      return 1;
  }

  newBounce() {
    let tempA = fixAngle(this.xV, this.velocity * this.sin - this.gravity * this.time);
    let tempS = [0, 0];
    let tempC = 1;
    if(this.xV >= 0)
      tempS[0] = 1;
    if(this.velocity * this.sin - this.gravity * this.time >= 0)
      tempS[1] = 1;
    if((!tempS[0] && !tempS[1]) || (tempS[0] && tempS[1]))
      tempC *= -1;
    tempA += tempC * (180 - 2 * tempA);
    if(tempA < 0) tempA += 360;
    else if(tempA >= 360) tempA -= 360;
    console.log(tempA);
  }
};

const tempObj = [[100,100], 20, 10, 45]; //Center, Width, Height, Angle

const objects = [
  new Stationary([100, 10], 10, 1, 5)
];

document.onkeydown = () => {
  if(event.keyCode == 32)
    keyStates.space = 1;
  else if(event.key == 'a')
    keyStates.a = 1;
  else if(event.key == 'd')
    keyStates.d = 1;
  else if(event.key == 'q')
    keyStates.q = 1;
  else if(event.key == 'e')
    keyStates.e = 1;
}

document.onkeyup = () => {
  if(event.keyCode == 32)
    keyStates.space = 0;
  else if(event.key == 'a')
    keyStates.a = 0;
  else if(event.key == 'd')
    keyStates.d = 0;
  else if(event.key == 'q')
    keyStates.q = 0;
  else if(event.key == 'e')
    keyStates.e = 0;
}

const checkKeys = () => {
  if(keyStates.space) {
    if(objects[0].cooldown <= 0) {
      objects[0].createProjectile();
      objects[0].cooldown = config.projectileCooldown * objects[0].cooldownMulti;
    } else {
      objects[0].cooldown -= 1;
    }
  }
  if(keyStates.a)
    if(objects[0].coords[0] - 1 > objects[0].playerRadi)
      objects[0].coords[0] -= 1;
  if(keyStates.d)
    if(objects[0].coords[0] + 1 < canvas.width - objects[0].playerRadi)
      objects[0].coords[0] += 1;
  if(keyStates.q) {
    objects[0].direction += 1;
    if(objects[0].direction >= 360)
      objects[0].direction -= 360;
  }
  if(keyStates.e) {
    objects[0].direction -= 1;
    if(objects[0].direction < 0)
      objects[0].direction += 360;
  }
};

interval = setInterval(() => {
  checkKeys();
  let marked = [];
  fillCanvas();
  objects.forEach(obj => {
    drawCirc(obj.coords, obj.playerRadi);
    if(obj.isPlayer) {
      drawLine(obj.coords, obj.coords.map((v, i) => v + Math[['cos', 'sin'][i]](toRad(obj.direction)) * (obj.playerRadi + 10)), obj.playerRadi/2);
      obj.projectiles.forEach(pro => {
        pro.checkLoopWall();
        if(pro.checkBounce())
          marked.push(pro);
        pro.newBounce();
        drawCirc(pro.pos, pro.radi);
        pro.time += config.tIncrement;
      });
    }
  });
  drawRectangle(...tempObj);
  marked.forEach(val => val.player.projectiles.splice(val.player.projectiles.indexOf(val), 1));
}, config.time);