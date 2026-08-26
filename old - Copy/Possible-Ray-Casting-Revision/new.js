class RectPrism {
  constructor(basePoints, height) {
    this.h = height;
    this.basePoints = basePoints;
    this.xEnds = [Math.min(...basePoints.map(v => v[0])),
                  Math.max(...basePoints.map(v => v[0]))];
    this.yEnds = [Math.min(...basePoints.map(v => v[1])),
                  Math.max(...basePoints.map(v => v[1]))];
    this.angles = [];

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
        this.fps              = 30,
        this.frameCalcDelay   = 30,
        this.fov              = halfPI,
        this.segments         = 400,
        this.distFromScrn     = this.segments / (2 * Math.tan(this.fov / 2)),
        this.stepSize         = .02,
        this.angleDelta       = 30,
        this.radDeltaOverTime = this.angleDelta / this.fps * Math.PI / 180,
        this.movementDelta    = 2,
        this.movDeltaOverTime = this.movementDelta / this.fps,
        this.bounds           = 50,
        this.multiClr         = .5,
        this.minClr           = 0;
      },
      keyStates  = {
        w: false,
        s: false,
        q: false,
        e: false,
        f: false
      },
      canvas     = document.getElementById("screen"),
      canvasHid  = document.getElementById("hidden"),
      ctx        = canvas.getContext("2d"),
      ctxHid     = canvasHid.getContext("2d"),
      objects    = [new RectPrism([[-5, 5], [0, 5], [0, 10], [-5, 10]], 30),
                    new RectPrism([[-5, -10], [0, -10], [2.5, -5], [-2.5, -5]], 30)],
      resizeScrn = () => {
        len = Math.min(window.innerWidth, window.innerHeight) - 2;
        canvas.style.width     = len;
        canvas.style.height    = len;
        canvas.width           = len;
        canvas.height          = len;
        canvasHid.style.width  = len;
        canvasHid.style.height = len;
        canvasHid.width        = len;
        canvasHid.height       = len;
        canvasX                = len / config.segments;
        halfLen                = len / 2;
      };

function drawSegment(pos, dims, color) {
  ctxHid.fillStyle = color;
  
  ctxHid.fillRect(...pos, ...dims);
}

function drawObjects() {
  ctxHid.fillStyle = "blue";
  ctxHid.strokeStyle = "blue";
  ctxHid.lineWidth = 1;
  
  ctxHid.beginPath();
  ctxHid.arc((pos[0] / 100 + .5) * len, (.5 - pos[1] / 100) * len, 10, 0, twoPI);
  ctxHid.fill();
  ctxHid.closePath();
  
  objects.forEach(obj => {
    let corners = obj.basePoints.map(point => point.map((v, i) => len * (v * (i ? -1 : 1) / 100 + .5)));
    ctxHid.beginPath();
    ctxHid.moveTo(...corners[0]);
    for (let i = 1; i < corners.length; ++i)
      ctxHid.lineTo(...corners[i]);
    ctxHid.lineTo(...corners[0]);
    ctxHid.stroke();
    ctxHid.closePath();
  });
}

function drawRay(rayPos) {
  ctxHid.strokeStyle = "white";
  ctxHid.lineWidth = 1;
  
  ctxHid.beginPath();
  ctxHid.moveTo(...pos.map((v, i) => len * ((i ? -1 : 1) * v / 100 + .5)));
  ctxHid.lineTo(...rayPos.map((v, i) => len * ((i ? -1 : 1) * v / 100 + .5)));
  ctxHid.stroke();
  ctxHid.closePath();
}

function ray(i) {
  let objHeight,
      rayPos    = [...pos],
      movAngle  = Math.atan((config.segments / 2 - i) / config.distFromScrn),
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
    
    if (objHeight != undefined) {
      let dist = Math.cos(movAngle) * Math.sqrt((rayPos[0] - pos[0]) ** 2 + (rayPos[1] - pos[1]) ** 2);
      objHeight = objHeight / dist * 50;
      
      return [objHeight, dist, rayPos];
    }
    
    rayPos[0] += config.stepSize * Math.cos(rayAngle);
    rayPos[1] += config.stepSize * Math.sin(rayAngle);
  }
  
  return [0, 0, rayPos];
}

function move(numberFrames = 0) {
  if (!(keyStates.w && keyStates.s)) {
    if (keyStates.w) {
      if (numberFrames) {
        pos[0] -= config.movDeltaOverTime * Math.cos(angle) * numberFrames;
        pos[1] -= config.movDeltaOverTime * Math.sin(angle) * numberFrames;
      } else {
        pos[0] += config.movDeltaOverTime * Math.cos(angle);
        pos[1] += config.movDeltaOverTime * Math.sin(angle);
      }
    } else if(keyStates.s) {
      if (numberFrames) {
        pos[0] += config.movDeltaOverTime * Math.cos(angle) * numberFrames;
        pos[1] += config.movDeltaOverTime * Math.sin(angle) * numberFrames;
      } else {
        pos[0] -= config.movDeltaOverTime * Math.cos(angle);
        pos[1] -= config.movDeltaOverTime * Math.sin(angle);
      }
    }
    return keyStates.w || keyStates.s;
  }
}

function turn(numberFrames = 0) {
  if (!(keyStates.q && keyStates.e)) {
    if (keyStates.q) {
      if (numberFrames)
        angle -= config.radDeltaOverTime * numberFrames;
      else
        angle += config.radDeltaOverTime;
    } else if (keyStates.e) {
      if (numberFrames)
        angle += config.radDeltaOverTime * numberFrames;
      else
        angle -= config.radDeltaOverTime;
    }
    while (angle > twoPI)
        angle -= twoPI;
    while (angle < 0)
        angle += twoPI;
    return keyStates.q || keyStates.e;
  }
}

var len,
    canvasX,
    halfLen,
    pos         = [0, 0],
    angle       = halfPI,
    frameBuffer = [],
    counter     = 0;

window.onkeydown = event => {
  if (Object.hasOwn(keyStates, event.key) && !keyStates[event.key]) {
    turn(frameBuffer.length);
    move(frameBuffer.length);
    keyStates[event.key] = true;
    frameBuffer = [];
  }
}

window.onkeyup = event => {
  if (Object.hasOwn(keyStates, event.key) && keyStates[event.key]) {
    turn(frameBuffer.length);
    move(frameBuffer.length);
    keyStates[event.key] = false;
    frameBuffer = [];
  }
}

function calcFrame() {
  let didTurn = turn(),
      didMove = move();

  if (!didTurn && !didMove && frameBuffer.length) {
    frameBuffer.push(frameBuffer[0]);
    return;
  }

  ctxHid.clearRect(0, 0, len, len);
  ctxHid.fillStyle = "black";
  ctxHid.fillRect(0, 0, len, len);
  
  if (keyStates.f)
    drawObjects();

  for (let i = 0; i < config.segments; ++i) {
    let rayInfo = ray(i);
    
    if (keyStates.f) {
      drawRay(rayInfo[2]);
    } else if (rayInfo[0]) {
      drawSegment([canvasX * i, halfLen - rayInfo[0]],
                  [canvasX, 2 * rayInfo[0]],
                  ["rgb(", ",", ",", ")"].join(rayInfo[1] ? Math.max(config.minClr, 255 / (rayInfo[1] * config.multiClr)) : config.minClr)
                 );
    }
  }
  
  frameBuffer.push(ctxHid.getImageData(0, 0, len, len));
}

function drawFrame() {
  if (counter) {
    if (frameBuffer.length) {
      counter = 0;
      ctx.clearRect(0, 0, len, len);
      ctx.putImageData(frameBuffer[0], 0, 0);
      frameBuffer.shift();
    } else
      console.log("No Queued Frames Ready");
  } else
    ++counter;
  
  requestAnimationFrame(drawFrame);
}

if (1000 / config.fps < config.frameCalcDelay)
  console.log("Warning: frames are set to calculate less times per second than they are drawn");

resizeScrn();
requestAnimationFrame(drawFrame);

setInterval(() => {
  if (frameBuffer.length < 200)
    calcFrame();
}, config.frameCalcDelay);

/*
Current system for what to do if frame is not ready when it is requested may need reworking.
*/