class RectPrism {
  constructor(basePoints, height) {
    this.h = height;
    this.basePoints = basePoints;
    this.xEnds = [Math.min(...basePoints.map(v => v[0])),
                  Math.max(...basePoints.map(v => v[0]))];
    this.yEnds = [Math.min(...basePoints.map(v => v[1])),
                  Math.max(...basePoints.map(v => v[1]))];
    this.angles = [];
    this.center = [null, null].map((v, i) => (basePoints[0][i] + basePoints[2][i]) / 2);
    this.radius = Math.sqrt((basePoints[0][0] - basePoints[2][0]) ** 2 + (basePoints[0][1] - basePoints[2][1]) ** 2) / 2;

    basePoints.forEach((v, i) => {
      let nextPoint = basePoints[i + 1 >= 4 ? 0 : i + 1];
      
      this.angles[i] = [Math.atan2(nextPoint[1] - v[1], nextPoint[0] - v[0])];
      if (this.angles[i][0] < 0)
        this.angles[i][0] += twoPI;
      
      this.angles[i][1] = Math.PI + this.angles[i][0];
      if (this.angles[i][1] >= twoPI)
        this.angles[i][1] -= twoPI;

      this.angles[i][2] = this.angles[i][1] < this.angles[i][0];
    });
  }
  
  pointInside(point) {
    if (point[0] < this.xEnds[0] ||
        point[0] > this.xEnds[1] ||
        point[1] < this.yEnds[0] ||
        point[1] > this.yEnds[1])
      return false;
    
    for (let i = 0; i < 4; ++i) {
      let pointAngle = Math.atan2(point[1] - this.basePoints[i][1], point[0] - this.basePoints[i][0]);
      if (pointAngle < 0)
        pointAngle += twoPI;
      
      if (pointAngle < this.angles[i][0] || (this.angles[i][2] && pointAngle < this.angles[i][1] || !this.angles[i][2] && pointAngle > this.angles[i][1]))
        return false;
    }

    return true;
  }
}

const twoPI      = Math.PI * 2,
      halfPI     = Math.PI / 2,
      config     = new function() {
        this.fov           = halfPI,
        this.segments      = /* 400 */ 100,
        this.distFromScrn  = this.segments / (2 * Math.tan(this.fov / 2)),
        this.stepSize      = .05,
        this.angleDelta    = 1,
        this.movementDelta = .2,
        this.bounds        = 50
      },
      keyStates  = {
        w: false,
        s: false,
        q: false,
        e: false,
        f: false
      },
      canvas     = document.getElementById("screen"),
      ctx        = canvas.getContext("2d"),
      objects    = [new RectPrism([[-5, 5], [0, 5], [0, 10], [-5, 10]], 30)],
      resizeScrn = () => {
        len = Math.min(window.innerWidth, window.innerHeight);
        canvas.style.width = len;
        canvas.style.height = len;
        canvas.width = len;
        canvas.height = len;
      };

var interval,
    len,
    pos   = [1, 1],
    angle = halfPI;

window.onkeydown = event => {
  if (Object.hasOwn(keyStates, event.key))
    keyStates[event.key] = true;
}

window.onkeyup = event => {
  if (Object.hasOwn(keyStates, event.key))
    keyStates[event.key] = false;
}

resizeScrn();

interval = setInterval(() => {
  ctx.clearRect(0, 0, len, len);
  if (keyStates.f) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc((pos[0] + 50) / 100 * len, (1 - (pos[1] + 50) / 100) * len, 10, 0, twoPI);
    ctx.fill();
    ctx.closePath();
    objects.forEach(v => {
      let points = v.basePoints.map(val => val.map((value, i) => {
        if (i)
          return (1 - (value + 50) / 100) * len;
        else
          return (value + 50) / 100 * len;
      }));
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(...points[0]);
      for (let i = 1; i < points.length; ++i)
        ctx.lineTo(...points[i]);
      ctx.lineTo(...points[0]);
      ctx.stroke();
      ctx.closePath();
    });
  }
  
  if ((keyStates.w || keyStates.s) && !(keyStates.w && keyStates.s)) {
    pos[0] += config.movementDelta * Math.cos(angle) * (keyStates.s ? -1 : 1);
    pos[1] += config.movementDelta * Math.sin(angle) * (keyStates.s ? -1 : 1);
  }

  if (keyStates.q && !keyStates.e) {
    angle += Math.PI / 90 * config.angleDelta;
    if (angle > twoPI)
      angle -= twoPI;
  } else if (keyStates.e && !keyStates.q) {
    angle -= Math.PI / 90 * config.angleDelta;
    if (angle < 0)
      angle += twoPI;
  }
/*
  objects.forEach((v, i) => {
    let angleBounds = [null, null].fill(v.center[0] * pos[1] - pos[1] * pos[0] + v.center[1] * pos[0] - v.center[0] * v.center[1]).map((val, index) => Math.atan((val + (1 - 2 * index) * v.radius * Math.sqrt(pos[0] ** 2 - 2 * v.center[0] * pos[0] + v.center[0] ** 2 + v.center[1] ** 2 + pos[1] ** 2 - 2 * v.center[1] * pos[1] - v.radius ** 2))/(2 * v.center[0] * pos[0] - v.center[0] ** 2 + v.radius ** 2 - pos[0] ** 2)));
    console.log(...angleBounds);
    //Math.atan((-1 * h * k + h * l - l * o + k * o + r * Math.sqrt(o ** 2 - 2 * h * o + h ** 2 + k ** 2 + l ** 2 - 2 * k * l - r ** 2))/(-1 * h ** 2 + 2 * h * o + r ** 2 - o ** 2)
    //angle + fov / 2 - Math.atan((config.segments / 2 - i) / config.distFromScrn) * i = angleBounds[0], angleBounds[1]
    //angle + Math.atan((config.segments / 2 - i) / config.distFromScrn) > angleBounds[0]
    //i < config.segments / 2 - Math.tan(angleBounds[0] - angle) * config.distFromScrn
    console.log(config.segments / 2 - Math.tan(angleBounds[0] - angle) * config.distFromScrn,
                config.segments / 2 - Math.tan(angleBounds[1] - angle) * config.distFromScrn);
  });
  */
  
  let canvasX = len / config.segments;
    
  for (let i = 0; i < config.segments; ++i) {
    let rayMovement,
        objHeight = 0,
        rayPos    = [...pos],
        movAngle  = Math.atan((config.segments / 2 - i) / config.distFromScrn);
        rayAngle  = angle + movAngle;

    if (rayAngle >= twoPI)
      rayAngle -= twoPI;
    else if(rayAngle < 0)
      rayAngle += twoPI;
    
    while (rayPos[0] < config.bounds &&
           rayPos[0] > config.bounds * -1 &&
           rayPos[1] < config.bounds &&
           rayPos[1] > config.bounds * -1) {
      for (let index = 0; index < objects.length; ++index) {
        if (objects[index].pointInside(rayPos)) {
          objHeight = objects[index].h;
          break;
        }
      }
      if (objHeight != 0) {
        let dist = Math.cos(movAngle) * Math.sqrt((rayPos[0] - pos[0]) ** 2 + (rayPos[1] - pos[1]) ** 2);
        objHeight = objHeight / dist * 50;
        if (!keyStates.f) {
          ctx.fillStyle = ["rgb(", ",", ",",")"].join(Math.max(0, 255 / (dist * .5)));
          ctx.fillRect(canvasX * i, len / 2 - objHeight, canvasX, 2 * objHeight);
        }
        break;
      }
      rayPos[0] += config.stepSize * Math.cos(rayAngle);
      rayPos[1] += config.stepSize * Math.sin(rayAngle);
    }
    if (keyStates.f) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(...pos.map((v, ind) => {
        if (ind)
          return (1 - (v + 50) / 100) * len;
        else
          return (v + 50) / 100 * len;
      }));
      ctx.lineTo(...rayPos.map((v, ind) => {
        if (ind)
          return (1 - (v + 50) / 100) * len;
        else
          return (v + 50) / 100 * len;
      }));
      ctx.stroke();
      ctx.closePath();
    }
  }
}, 50);