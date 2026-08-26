class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.magnitude = Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y; 
  }

  scalarMulti(s) {
    return new Vector(this.x * s, this.y * s);
  }

  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
  
  subtract(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  clean() {
    this.x = Math.round(this.x * 1000) / 1000;
    this.y = Math.round(this.y * 1000) / 1000;
    this.magnitude = Math.round(this.magnitude * 1000) / 1000;
  }
}

const c = document.getElementById("c"),
      ctx = c.getContext("2d"),
      platform = new Vector(1, 1),
      ballV = new Vector(.9, -1);

function reflect(obj, plat) {
  let projection = plat.scalarMulti(obj.dot(plat) / (plat.magnitude ** 2));
  return projection.scalarMulti(2).subtract(obj);
}

c.width = window.innerWidth;
c.height = window.innerHeight;
ctx.lineWidth = 2;
ctx.strokeStyle = "white";

ballVf = reflect(ballV, platform);
ballVf.clean();

console.log(ballVf);

ctx.beginPath();
ctx.moveTo(ballV.x * 50 + c.width / 2, c.height / 2 - ballV.y * -50);
ctx.lineTo(c.width / 2, c.height / 2);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.moveTo(ballVf.x * 50 + c.width / 2, c.height / 2 - ballVf.y * -50);
ctx.lineTo(c.width / 2, c.height / 2);
ctx.stroke();
ctx.closePath();