class Angle {
  constructor(amount) {
    this.deg = amount;
    this.rad = this.deg / 180 * Math.PI;
  }

  rotate(amount) {
    this.deg = fix(this.deg + amount, 13);
    if (this.deg > 180) {
      this.deg = fix(this.deg - 360, 13);
    } else if (this.deg <= -180) {
      this.deg = fix(this.deg + 360, 13);
    }
    this.rad = this.deg / 180 * Math.PI;
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distance(point) {
    return Math.hypot(this.x - point.x, this.y - point.y);
  }
}

class Rectangle {
  constructor(lt, width, height) {
    if (!(lt instanceof Point))
      throw new TypeError("`lt` must be a Point");

    if (typeof(height) != "number" || typeof(width) != "number")
      throw new TypeError("`height` and `width` must be numbers");

    if (height <= 0 || width <= 0)
      throw new RangeError("`height` and `width` must not be negative or zero");

    this.lt = lt;
    this.rt = new Point(lt.x + width, lt.y);
    this.lb = new Point(lt.x, lt.y + height);
    this.rb = new Point(lt.x + width, lt.y + height);
    this.width = width;
    this.height = height;
  }

  intersecting(thing) {
    if (thing instanceof Point) {
      if (thing.x >= this.lt.x && thing.x <= this.rt.x && thing.y >= this.lt.y && thing.y <= this.lb.y)
        return true;
      
      return false;
    } else if (thing instanceof Rectangle) {
      return (
        this.lt.x < thing.rb.x &&
        this.rb.x > thing.lt.x &&
        this.lt.y < thing.rb.y &&
        this.rb.y > thing.lt.y
      );
    } else {
      throw new TypeError("`thing` must be a Point or Rectangle");
    }
  }

  draw(color) {
    ctx.fillStyle = color;
    ctx.fillRect(
      this.lt.x,
      this.lt.y,
      this.width,
      this.height
    );
  }
}
        
class Circle {  
  constructor(center, radius) {
    if (!(center instanceof Point))
      throw new TypeError("`center` must be a Point");

    if (typeof(radius) != "number")
      throw new TypeError("`radius` must be a number");

    if (radius <= 0)
      throw new TypeError("`radius` must not be negative or zero");
    
    this.center = center;
    this.radius = radius;
  }

  intersecting(thing) {
    if (thing instanceof Point) {
      return thing.distance(this.center) <= this.radius;
    } else if (thing instanceof Rectangle) {
      let closestPoint = new Point(
        Math.max(thing.lt.x, Math.min(this.center.x, thing.rb.x)),
        Math.max(thing.lt.y, Math.min(this.center.y, thing.rb.y))
      );

      return closestPoint.distance(this.center) <= this.radius;
    } else if (thing instanceof Circle) {
      return this.center.distance(thing.center) <= this.radius + thing.radius;
    } else {
      throw new TypeError("`thing` must be a Point, Rectangle, or Circle");
    }
  }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const config = {
  res: 1,
  fov: 60,
  framerate: 30,
  objMaxColor: [150, 150, 150],
  objMinColor: [20, 20, 20],
  renderDist: 600,
  moveIncrementPerSec: 60,
  rotateIncrementPerSec: 80,
  sizeFactor: 20
}

const moveIncrement = 30/config.framerate;
const rotateIncrement = 40/config.framerate;

const objects = [
  new Rectangle(new Point(0, 0), 500, 5),
  new Rectangle(new Point(495, 5), 5, 190),
  new Rectangle(new Point(0, 195), 500, 5),
  new Rectangle(new Point(0, 5), 5, 190),
  new Rectangle(new Point(400, 50), 5, 100),
  new Rectangle(new Point(300, 50), 5, 100),
  new Rectangle(new Point(200, 75), 50, 50),
  new Circle(new Point(50, 100), 5),
  new Circle(new Point(50, 50), 5),
  new Circle(new Point(50, 150), 5),
  new Circle(new Point(50, 75), 5),
  new Circle(new Point(50, 125), 5)
];

const sizeCanvas = () => {
  if (window.innerWidth <= window.innerHeight && window.innerWidth <= 1000) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
  } else if (window.innerHeight <= 1000) {
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;
  } else {
    canvas.width = 1000;
    canvas.height = 1000;
  }
  render();
};

const gradient = (x1, y1, x2, y2, colors) => {
  let grad = ctx.createLinearGradient(x1, y1, x2, y2);
  colors.forEach((color, i) => grad.addColorStop((i + 1) / colors.length, color));
  return grad;
};

const drawCrosshair = () => {
  new Rectangle(new Point(canvas.width/2 - 5, canvas.height/2 - 0.5), 10, 1).draw('white');
  new Rectangle(new Point(canvas.width/2 - 0.5, canvas.height/2 - 5), 1, 10).draw('white');
}

const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas. height);

const drawBackground = () => {
  let gradient1 = gradient(0, 0, 0, canvas.height/2, ['#595959', 'black']);
  let gradient2 = gradient(0, canvas.height, 0, canvas.height/2, ['#595959', 'black']);
  new Rectangle(new Point(0, 0), canvas.width, canvas.height/2).draw(gradient1);
  new Rectangle(new Point(0, canvas.height/2), canvas.width, canvas.height/2).draw(gradient2);
}

const toRad = deg => deg * Math.PI / 180;

const keystates = {
  w: false,
  s: false,
  a: false,
  d: false,
  q: false,
  e: false
};

var playerPosition = new Point(100, 100);
var playerAngle = new Angle(0);

window.onresize = sizeCanvas;

document.body.onload = sizeCanvas;

document.onkeydown = e => { keystates[e.key] = true; }

document.onkeyup = e => { keystates[e.key] = false; }

const keyfunc = () => {
  if (!Object.entries(keystates).some(([k, v]) => v)) return null;
  
  let movement = [0, 0]
  Object.entries({
    q: [[0, 0], rotateIncrement],
    e: [[0, 0], -rotateIncrement],
    w: [[moveIncrement, 0], 0],
    s: [[-moveIncrement, 0], 0],
    a: [[moveIncrement, Math.PI/2], 0],
    d: [[-moveIncrement, Math.PI/2], 0]
  }).forEach(([key, [moveChange, angleChange]]) => {
    if (keystates[key]) {
      playerAngle.rotate(angleChange);
      movement[0] += moveChange[0] * Math.cos(playerAngle.rad + moveChange[1]);
      movement[1] += moveChange[0] * Math.sin(playerAngle.rad + moveChange[1]);
    }
  });
  if (movement[0] == 0 && movement[1] == 0) return render();

  let angle = new Angle(Math.atan2(movement[1], movement[0]) * 180 / Math.PI);
  move([moveIncrement * Math.cos(angle.rad), moveIncrement * Math.sin(angle.rad)]);
}

const colliding = (thing) => objects.some(o => thing.intersecting(o));

const move = ([xi, yi]) => {
  if (xi == 0 && yi == 0) {
    xi = moveIncrement;
  }
  let tempcoord = playerPosition.x + xi;
  if (!colliding(new Circle(new Point(tempcoord, playerPosition.y), 1)))
    playerPosition.x = tempcoord;
  tempcoord = playerPosition.y + yi;
  if (!colliding(new Circle(new Point(playerPosition.x, tempcoord), 1)))
    playerPosition.y = tempcoord;
  render();
}

const isInFront = (point, pointRise, pointRun, newPointLT, newPointRB = newPointLT) =>
  (pointRun > 0 && newPointLT.x > point.x) ||
  (pointRun < 0 && newPointRB.x < point.x) ||
  (pointRise > 0 && newPointLT.y > point.y) ||
  (pointRise < 0 && newPointRB.y < point.y);

const fix = (equation, digit) => parseFloat((equation).toFixed(digit));

/*const closestPointOfIntersection = (angle, point) => {
  if(!(angle instanceof Angle))
    throw new TypeError('`angle` must be an instance of Angle');
  if(!(point instanceof Point))
    throw new TypeError('`point` must be an instance of Point');
  let points = [];
  let pointRise = fix(Math.sin(angle.rad), 13);
  let pointRun = fix(Math.cos(angle.rad), 13);
  let pointSlope = undefined;
  let pointYIntercept;
  if(pointRun != 0) {
    pointSlope = pointRise / pointRun;
    pointYIntercept = point.y - point.x * pointSlope;
  }
  objects.forEach(o => {
    if(o instanceof Rectangle) {
      if(isInFront(point, pointRise, pointRun, o.lt, o.rb)) {
        let corners = ['lt', 'rt', 'rb', 'lb'];
        corners.forEach((corner, i) => {
          let newPoint;
          let objectRise = fix(o[corner].y - o[corners[i + 1 > 3 ? 0 : i + 1]].y, 13);
          let objectRun = fix(o[corner].x - o[corners[i + 1 > 3 ? 0 : i + 1]].x, 13);
          let objectSlope = undefined;
          let objectYIntercept;
          if(objectRun != 0) {
            objectSlope = objectRise / objectRun;
            objectYIntercept = o[corner].y - o[corner].x * objectSlope;
          }
          if(objectSlope != pointSlope) {
            if(!(objectSlope === undefined) && !(pointSlope === undefined)) {
              newPoint = new Point(
                fix((objectYIntercept - pointYIntercept) / (pointSlope - objectSlope), 13),
                fix((pointSlope * objectYIntercept - objectSlope * pointYIntercept) / (pointSlope - objectSlope), 13)
              );
            } else {
              if(!(objectSlope === undefined))
                newPoint = new Point(point.x, fix(objectSlope * point.x + objectYIntercept, 13));
              else
                newPoint = new Point(o[corner].x, fix(pointSlope * o[corner].x + pointYIntercept, 13));
            }
            if(o.intersecting(newPoint) && isInFront(point, pointRise, pointRun, newPoint))
              points.push(newPoint);
          }
        });
      }
    } else if(o instanceof Circle) {
      let newPoint;
      let a = fix(pointRun ** 2 + pointRise ** 2, 13);
      let b = fix(2 * (pointRun * (point.x - o.center.x) + pointRise * (point.y - o.center.y)), 13);
      let c = fix((point.x - o.center.x) ** 2 + (point.y - o.center.y) ** 2 - o.radius, 13);
      let det = fix(b ** 2 - 4 * a * c, 13);
      if(det == 0) {
        let t = -b / (2 * a);
        newPoint = new Point(fix(point.x + t * pointRun, 13), fix(point.y + t * pointRise, 13));
      } else if(det > 0) {
        let t = (-b + Math.sqrt(det)) / (2 * a);
        newPoint = new Point(fix(point.x + t * pointRun, 13), fix(point.y + t * pointRise, 13));
        t = (-b - Math.sqrt(det)) / (2 * a);
        newPoint = new Point(fix(point.x + t * pointRun, 13), fix(point.y + t * pointRise, 13));
      }
      if(det >= 0)
        if(isInFront(point, pointRise, pointRun, newPoint))
          points.push(newPoint);
    }
  });
  let closestPoint = points[0];
  points.forEach(curPoint => {
    if(curPoint.distance(point) < closestPoint.distance(point)) {
      closestPoint = curPoint;
    }
  });
  if(closestPoint instanceof Point)
    return playerPosition.distance(closestPoint);
  return NaN;
};*/

const render = () => {
  let x = 0;
  let dv = canvas.width/2/Math.tan(new Angle(config.fov/2).rad);
  clearCanvas();
  drawBackground();
  let amountOfRays = canvas.width/config.res;
  for(let i = 0; i < amountOfRays; ++i) {
    let angle = new Angle(Math.atan((canvas.width/2 - x)/dv) * 180 / Math.PI);
    angle.rotate(playerAngle.deg);
    let dist = closestPointOfIntersection(angle, playerPosition);
    if(dist) {
      let height = config.sizeFactor * dv / (Math.cos(angle.rad - playerAngle.rad) * dist);
      let colorMulti = Math.max(Math.min(1 - dist/80, 1), 0);
      let color = 'rgb(' + config.objMaxColor.map((e, i) => (e - config.objMinColor[i]) * colorMulti + config.objMinColor[i]).join(',') + ')';
      new Rectangle(new Point(config.res * i, (canvas.height - height)/2), config.res, height).draw(color);
    }
    x += canvas.width / amountOfRays;
  }
  drawCrosshair();
};

setInterval(keyfunc, 1000/config.framerate);

const crossProduct = (v1, v2) => fix(v1[0] * v2[1] - v1[1] * v2[0], 13);
const vectorSub = (v1, v2) => [fix(v1[0] - v2[0], 13), fix(v1[1] - v2[1], 13)];
const vectorAdd = (v1, v2) => [fix(v1[0] + v2[0], 13), fix(v1[1] + v2[1], 13)];
const scalarMulti = (v, s) => [fix(v[0] * s, 13), fix(v[1] * s, 13)];

const rayLineSegmentIntersection = (lineseg, ray) => {
  let q = [lineseg[0].x, lineseg[0].y];
  let s = [lineseg[1].x - lineseg[0].x, lineseg[1].y - lineseg[0].y];
  let p = [ray[0].x, ray[0].y];
  let r = [ray[1][0], ray[1][1]];
  let t = crossProduct(vectorSub(q, p), s) / crossProduct(r, s);
  let u = crossProduct(vectorSub(q, p), r) / crossProduct(r, s);
  if(t >= 0 && u >= 0 && u <= 1 && crossProduct(r, s) != 0) {
    let vector = vectorAdd(p, scalarMulti(r, t));
    return new Point(vector[0], vector[1]);
  } else {
    return NaN;
  }
}

const closestPointOfIntersection = (angle, point) => {
  if(!(angle instanceof Angle))
    throw new TypeError('`angle` must be an instance of Angle');
  if(!(point instanceof Point))
    throw new TypeError('`point` must be an instance of Point');
  let points = [];
  let pointRise = fix(Math.sin(angle.rad), 13);
  let pointRun = fix(Math.cos(angle.rad), 13);
  let pointSlope = undefined;
  let pointYIntercept;
  if(pointRun != 0) {
    pointSlope = pointRise / pointRun;
    pointYIntercept = point.y - point.x * pointSlope;
  }
  objects.forEach(o => {
    if(o instanceof Rectangle) {
      if(isInFront(point, pointRise, pointRun, o.lt, o.rb)) {
        let corners = ['lt', 'rt', 'rb', 'lb'];
        corners.forEach((corner, i) => {
          let lineseg = [o[corner], o[corners[i + 1 > 3 ? 0 : i + 1]]];
          let ray = [point, [pointRun, pointRise]];
          let result = rayLineSegmentIntersection(lineseg, ray);
          if(result)
            points.push(result);
        });
      }
    } else if(o instanceof Circle) {
      if(isInFront(point, pointRise, pointRun, new Point(o.center.x + o.radius, o.center.y + o.center.radius), new Point(o.center.x - o.radius, o.center.y - o.center.radius))) {
        let newPoint = [];
        let a = fix(pointRun ** 2 + pointRise ** 2, 13);
        let b = fix(2 * (pointRun * (point.x - o.center.x) + pointRise * (point.y - o.center.y)), 13);
        let c = fix((point.x - o.center.x) ** 2 + (point.y - o.center.y) ** 2 - o.radius, 13);
        let det = fix(b ** 2 - 4 * a * c, 13);
        let t = [];
        if(det >= 0) {
          if(det == 0) {
            t.push(-b / (2 * a));
          } else {
            t.push((-b + Math.sqrt(det)) / (2 * a));
            t.push((-b - Math.sqrt(det)) / (2 * a));
          }
          t.forEach(v => newPoint.push(new Point(fix(point.x + v * pointRun, 13), fix(point.y + v * pointRise, 13))));
          newPoint.forEach(p => {
            if(isInFront(point, pointRise, pointRun, p))
              points.push(p);
          });
        }
      }
    }
  });
  let closestPoint = points[0];
  points.forEach(curPoint => {
    if(curPoint.distance(point) < closestPoint.distance(point)) {
      closestPoint = curPoint;
    }
  });
  if(closestPoint instanceof Point)
    return playerPosition.distance(closestPoint);
  return NaN;
};