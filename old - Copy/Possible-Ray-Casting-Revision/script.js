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

class Frame {
  constructor(imgData, camPos, camAngle) {
    this.imgData  = imgData;
    this.camPos   = camPos;
    this.camAngle = camAngle;
  }

  draw() {
    ctx.clearRect(0, 0, len, len);
    ctx.putImageData(this.imgData, 0, 0);
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
  ctxHid.arc((expectedPos[0] / 100 + .5) * len, (.5 - expectedPos[1] / 100) * len, 10, 0, twoPI);
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
  ctxHid.moveTo(...expectedPos.map((v, i) => len * ((i ? -1 : 1) * v / 100 + .5)));
  ctxHid.lineTo(...rayPos.map((v, i) => len * ((i ? -1 : 1) * v / 100 + .5)));
  ctxHid.stroke();
  ctxHid.closePath();
}

function ray(i) {
  let objHeight,
      rayPos    = [...expectedPos],
      movAngle  = Math.atan((config.segments / 2 - i) / config.distFromScrn),
      rayAngle  = expectedAngle + movAngle;

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
      let dist = Math.cos(movAngle) * Math.sqrt((rayPos[0] - expectedPos[0]) ** 2 + (rayPos[1] - expectedPos[1]) ** 2);
      objHeight = objHeight / dist * 50;
      
      return [objHeight, dist, rayPos];
    }
    
    rayPos[0] += config.stepSize * Math.cos(rayAngle);
    rayPos[1] += config.stepSize * Math.sin(rayAngle);
  }
  
  return [0, 0, rayPos];
}

function move() {
  if (!(keyStates.w && keyStates.s)) {
    if (keyStates.w) {
      expectedPos[0] += config.movDeltaOverTime * Math.cos(angle);
      expectedPos[1] += config.movDeltaOverTime * Math.sin(angle);
    } else if(keyStates.s) {
      expectedPos[0] -= config.movDeltaOverTime * Math.cos(angle);
      expectedPos[1] -= config.movDeltaOverTime * Math.sin(angle);
    }
    return keyStates.w || keyStates.s;
  }
}

function turn() {
  if (!(keyStates.q && keyStates.e)) {
    if (keyStates.q) {
      expectedAngle += config.radDeltaOverTime;
    } else if (keyStates.e) {
      expectedAngle -= config.radDeltaOverTime;
    }
    while (expectedAngle > twoPI)
        expectedAngle -= twoPI;
    while (expectedAngle < 0)
        expectedAngle += twoPI;
    return keyStates.q || keyStates.e;
  }
}

var len,
    canvasX,
    halfLen,
    pos           = [0, 0],
    expectedPos   = [...pos],
    angle         = halfPI,
    expectedAngle = angle + 0;
    frameBuffer   = [],
    counter       = 0,
    camChange     = false,
    camIsChanging = false,
    isCalcFrames  = false;

window.onkeydown = event => {
  if (Object.hasOwn(keyStates, event.key) && !keyStates[event.key]) {
    keyStates[event.key] = true;
    frameBuffer = [];
    expectedPos = [...pos];
    expectedAngle = angle;
    if(!isCalcFrames)
      fillFrameBuffer();
  }
}

window.onkeyup = event => {
  if (Object.hasOwn(keyStates, event.key) && keyStates[event.key]) {
    keyStates[event.key] = false;
    frameBuffer = [];
    expectedPos = [...pos];
    expectedAngle = angle;
    if(!isCalcFrames)
      fillFrameBuffer();
  }
}

function fillFrameBuffer() {
  isCalcFrames = true;

  if (!camIsChanging)
    calcFrame();
  
  if (frameBuffer.length < 200)
    setTimeout(fillFrameBuffer, 1);
  else
    isCalcFrames = false;
}

function calcFrame() {
  if (camChange)
    camChange = false;
  
  let didTurn = turn(),
      didMove = move();

  if (!didTurn && !didMove && frameBuffer.length) {
    frameBuffer.push(frameBuffer[0]);
    return;
  }

  ctxHid.clearRect(0, 0, len, len);
  ctxHid.fillStyle = "black";
  ctxHid.fillRect(0, 0, len, len);

  objects.forEach((v, i) => {
    let angleBounds = [];
  });
  
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

  if (!camChange)
    frameBuffer.push(new Frame(ctxHid.getImageData(0, 0, len, len), [...expectedPos], expectedAngle));
}

function drawFrame() {
  if (counter) {
    counter = 0;
    if (frameBuffer.length) {
      pos = [...frameBuffer[0].camPos];
      angle = frameBuffer[0].camAngle;
      frameBuffer[0].draw();
      frameBuffer.shift();
      if (!isCalcFrames)
        fillFrameBuffer();
    } else {
      camChanged = true;
      camIsChanging = true;
      turn();
      move();
      camIsChanging = false;
      console.log("No Queued Frames Ready");
    }
  } else
    ++counter;
  
  requestAnimationFrame(drawFrame);
}

if (1000 / config.fps < config.frameCalcDelay)
  console.log("Warning: frames are set to calculate less times per second than they are drawn");

resizeScrn();
requestAnimationFrame(drawFrame);
fillFrameBuffer();

/*
Maybe set a very small cooldown before a key's state can be changed (for both true and false) to ensure the player cannot spam keys, which can make the camera's movement feel janky
Can use performance.now() to measure how long its been since key state has been changed ^^^^^^^^^^

Also, code should currently be able to account for missed frames and make up the distance that should have been traveled by the next frame (aka if only 1 frame is calculated every second you would still move a total of 30 frames [30 fps] worth in that second)
*/