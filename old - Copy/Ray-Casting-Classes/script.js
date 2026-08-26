"use strict";

const fpeql = (a, b) => Math.abs(b - a) < Number.EPSILON;

class Angle {
  static atan2(y, x) {
    return new Angle(Math.atan2(y, x));
  }

  constructor(angle, type = "radian") {
    if (typeof(angle) !== "number")
      throw new TypeError("A number must be provided for an angle");

    switch (type.toLowerCase().replace(/[^a-z]/g, "")) {
      case "d":
      case "deg":
      case "degree":
        this.deg = angle; break;
      case "r":
      case "rad":
      case "radian":
        this.rad = angle; break;
      default:
        throw new Error("`type` must be `degree` or `radian`");
    }
  }

  rotate(amount) {
    if (!(amount instanceof Angle))
      throw new TypeError("`rotate()` requires an Angle");

    this.rad = parseFloat(Math.asin(this.rad + amount.rad).toFixed(15));
  }

  get deg() {
    return this.rad * 180 / Math.PI;
  }

  set deg(angle) {
    this.rad = angle / 180 * Math.PI;
  }
}

"sin cos tan asin acos atan"
  .split(" ")
  .forEach(name => {
    Angle[name] = arg => new Angle(Math[name](arg));
    Angle.prototype[name] = arg => new Angle(Math[name](this.angle));
  });

class Point {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

"distance toCartesian toPolar"
  .split(" ")
  .forEach(name => Point.prototype[name] = () => {throw new Error("`" + name + "()` undefined for a systemless Point")});

class CartesianPoint extends Point {
  constructor(x, y) {
    if (typeof(x) !== "number" || typeof(y) !== "number")
      throw new TypeError("Numbers must be provided for CartesianPoint coordinates");

    super(x, y);
  }

  distance(other) {
    if (!(other instanceof Point))
      throw new TypeError("`other` must be an instance of Point");

    let oc = other.toCartesian();

    return Math.sqrt((oc.b - this.b) ** 2 + (oc.a - this.a) ** 2);
  }
  
  toCartesian() {
    return this;
  }

  toPolar() {
    return new PolarPoint(
      Math.hypot(this.b, this.a),
      Angle.atan2(this.b, this.a)
    );
  }
}

class PolarPoint extends Point {
  constructor(r, t) {
    if (typeof(r) !== "number")
      throw new TypeError("A PolarPoint's magnitute must be a number");
    if (!(t instanceof Angle))
      throw new TypeError("A PolarPoint's theta must be an Angle");

    super(r, t);
  }

  distance(other) {
    if (!(other instanceof Point))
      throw new TypeError("`other` must be an instance of Point");

    this.toCartesian().distance(other.toCartesian());
  }

  toCartesian() {
    return new CartesianPoint(
      this.a * Math.cos(this.b),
      this.a * Math.sin(this.b)
    );
  }

  toPolar() {
    return this;
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
    } else {
      throw new TypeError("`thing` must be a Point or Rectangle");
    }
  }
}

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

const sizecanvas = () => {
  if (window.innerWidth <= window.innerHeight && window.innerWidth <= 300) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
  } else if (window.innerHeight <= 300) {
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;
  } else {
    canvas.width = 300;
    canvas.height = 300;
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

const toRad = deg => deg * Math.PI / 180;

const rotate = (angle, i) => {
  angle += i;
  if (angle > 180)
    angle -= 360;
  else if (angle <= -180)
    angle += 360;
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

var playerpos = new Point(100, 100);
var playerangle = 0;

window.onresize = sizecanvas;

document.onkeydown = e => { keystates[e.key] = true; }

document.onkeyup = e => { keystates[e.key] = false; }

function keyfunc() {
  if (!Object.entries(keystates).some(([k, v]) => v)) return null;
  
  let movement = [0, 0]
  Object.entries({
    q: [[0, 0], rotatei],
    e: [[0, 0], -rotatei],
    w: [[movei, 0], 0],
    s: [[-movei, 0], 0],
    a: [[movei, 90], 0],
    d: [[-movei, 90], 0]
  }).forEach(([key, [moveChange, angleChange]]) => {
    if (keystates[key]) {
      playerangle = rotate(playerangle, angleChange);
      movement[0] += moveChange[0] * Math.cos(toRad(rotate(playerangle, moveChange[1])));
      movement[1] += moveChange[0] * Math.sin(toRad(rotate(playerangle, moveChange[1])));
    }
  });
  if (movement[0] == 0 && movement[1]) return null;

  let angle = Math.atan2(movement[1], movement[0]);
  movement = [movei * Math.cos(angle), movei * Math.sin(angle)];
  console.log(movement);
  move(movement);

  /*
  {
         x,  y
    w: [ 1,  0],
    s: [-1,  0],
    a: [ 0,  1],
    d: [ 0, -1]
  }

  [x * movei, y * movei]

  */
  /*
  let keys = [
    ['w', 's', () => { move(movei, playerangle) }],
    ['s', 'w', () => { move(-movei, playerangle) }],
    ['a', 'd', () => { move(movei, rotate(playerangle, 90)) }],
    ['d', 'a', () => { move(movei, rotate(playerangle, -90)) }],
    ['q', 'e', () => { playerangle = rotate(playerangle, rotatei); render(); }],
    ['e', 'q', () => { playerangle = rotate(playerangle, -rotatei); render(); }],
  ];
  keys.forEach(k => {
    if (keystates[k[0]] && !keystates[k[1]]) {
      k[2]();
    }
  });
  */
}

function move([xi, yi]) {
  if (xi == 0 && yi == 0) {
    xi = movei;
  }
  let tempcoord = playerpos.x + xi;
  if (!colliding(new Rectangle(new Point(tempcoord - 2.5, playerpos.y - 2.5), 5, 5)))
    playerpos.x = tempcoord;
  tempcoord = playerpos.y + yi;
  if (!colliding(new Rectangle(new Point(playerpos.x - 2.5, tempcoord - 2.5), 5, 5)))
    playerpos.y = tempcoord;
  render();
}

function colliding(thing) {
  return objects.some(o => o.intersecting(thing));
}

function render() {
  let angle = rotate(playerangle, config.fov/2);
  let gradient1 = gradient(0, 0, 0, canvas.height/2, ['gray','black']);
  let gradient2 = gradient(0, canvas.height, 0, canvas.height/2, ['gray','black']);
  clearCanvas();
  new Rectangle(new Point(0, 0), canvas.width, canvas.height/2).draw(gradient1);
  new Rectangle(new Point(0, canvas.height/2), canvas.width, canvas.height/2).draw(gradient2);
  for(let i = 0; i < canvas.width/config.res; ++i) {
    let pos = new Point(playerpos.x, playerpos.y);
    let xi = 0.5 * Math.cos(toRad(angle));
    let yi = 0.5 * Math.sin(toRad(angle));
    while(!colliding(pos)) {
      pos.x += xi;
      pos.y += yi;
    }
    while(colliding(pos)) {
      pos.x -= xi * 0.1;
      pos.y -= yi * 0.1;
    }
    pos.x += xi * 0.1;
    pos.y += yi * 0.1;
    let height = 2 * (size / pos.distance(playerpos));
    let bval = Math.floor(255 * height/400);
    bval = bval > 190 ? 190 : bval;
    let color = 'rgb(' + 0 + ',' + 0 + ',' + bval + ')';
    new Rectangle(new Point(config.res * i, (canvas.height - height)/2), config.res, height).draw(color);
    angle = rotate(angle, -config.fov/(canvas.width/config.res));
  }
  drawCrosshair();
}

setInterval(keyfunc, 1000/config.framerate);