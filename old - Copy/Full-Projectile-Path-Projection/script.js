class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getPointArray() {
    return [this.x, this.y];
  }
}

class Vector {
  constructor(magnitude, direction) { //direction is degrees north of east
    direction *= Math.PI / 180;
    this.vector = [Math.cos(direction), Math.sin(direction)].map(v => v * magnitude);
  }
}

class Path {
  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;
  }

  calculatePosition(time) {
    return new Point(
      this.position.x + this.velocity.vector[0] * time,
      this.position.y + this.velocity.vector[1] * time - (4.9 * accelerationMulti) * time ** 2
    );
  }
}

class Ball {
  constructor(initialPosition, initialVelocity, radius, color) {
    this.radius = radius;
    this.color = color;

    this.constructPath(initialPosition, initialVelocity);
  }

  constructPath(initialPosition, initialVelocity) {
    this.path = [];

    let currentVelocity  = initialVelocity,
        currentPosition  = initialPosition,
        curTime          = 0,
        curPathNumber    = 0,
        maxNumberofPaths = 500;

    while (Number.parseFloat(currentVelocity.vector[1].toFixed(2)) != 0 && curPathNumber < maxNumberofPaths) {
      let timeTillCollisions  = [0 /*left*/, 0 /*right*/, 0 /*up*/, 0 /*down*/],
          times = [null, null],
          wallDiscriminant = currentVelocity.vector[1] ** 2 + (19.6 * accelerationMulti) * (currentPosition.y - (c.height - this.radius)),
          collisionTime = 0,
          collisionSurface = 0;
      if (currentVelocity.vector[0] > 0)
        timeTillCollisions[1] = (c.width - this.radius - currentPosition.x) / currentVelocity.vector[0];
      else if (currentVelocity.vector[0] < 0)
        timeTillCollisions[0] = (this.radius - currentPosition.x) / currentVelocity.vector[0];
      if (wallDiscriminant >= 0) {
        times = times.map((_, i) => (currentVelocity.vector[1] + (i ? -1 : 1) * Math.sqrt(wallDiscriminant)) / (9.8 * accelerationMulti));
        timeTillCollisions[2] = Math.min(...times);
      }
      wallDiscriminant = currentVelocity.vector[1] ** 2 + (19.6 * accelerationMulti) * (currentPosition.y - this.radius);
      times = times.map((_, i) => (currentVelocity.vector[1] + (i ? -1 : 1) * Math.sqrt(wallDiscriminant)) / (9.8 * accelerationMulti));
      times = times.map(v => {
        if (v < 0)
          return Infinity;
        else
          return v;
      });
      timeTillCollisions[3] = Math.min(...times);
      timeTillCollisions.forEach((v, i) => {
        if (v > 0 && (collisionTime == 0 || v < collisionTime)) {
          collisionTime = v;
          collisionSurface = i;
        }
      });
      this.path.push([new Path(JSON.parse(JSON.stringify(currentPosition)), JSON.parse(JSON.stringify(currentVelocity))), collisionTime + curTime]);
      if (collisionSurface < 2) {
        if (collisionSurface == 0)
          currentPosition.x = this.radius + 0.0000001;
        else
          currentPosition.x = c.width - this.radius - 0.0000001;
        currentPosition.y += currentVelocity.vector[1] * collisionTime - (4.9 * accelerationMulti) * collisionTime ** 2;
      } else {
        if (collisionSurface == 2)
          currentPosition.y = c.height - this.radius - 0.0000001;
        else
          currentPosition.y = this.radius + 0.0000001;
        currentPosition.x += currentVelocity.vector[0] * collisionTime;
      }
      currentVelocity.vector[0] *= bouncinessConstant;
      currentVelocity.vector[1] = (currentVelocity.vector[1] - (9.8 * accelerationMulti) * collisionTime) * bouncinessConstant;
      if (collisionSurface < 2)
        currentVelocity.vector[0] *= -1;
      else
        currentVelocity.vector[1] *= -1;
      curTime += collisionTime;
      ++curPathNumber;
    }
  }
  
  drawPath(timeIncrement) {
    let i = 0,
        time = timeIncrement,
        lastPoint = this.path[i][0].calculatePosition(0).getPointArray();
    while (i < this.path.length) {
      if (time <= this.path[i][1]) {
        let newPoint = this.path[i][0].calculatePosition(time - (i > 0 ? this.path[i - 1][1] : 0)).getPointArray();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(...lastPoint.map((v, i) => {
          if (i) return c.height - v;
          return v;
        }));
        ctx.lineTo(...newPoint.map((v, i) => {
          if (i) return c.height - v;
          return v;
        }));
        ctx.stroke();
        ctx.closePath();
        lastPoint = newPoint;
        time += timeIncrement;
      } else {
        ++i;
      }
    }
  }

  drawBallOnPath(fps) {
    pathIndex = 0;
    timeForInterval = 1 / fps;
    
    interval = setInterval(() => {
      if (pathIndex >= this.path.length)
        clearInterval(interval);
      else {
        if (timeForInterval <= this.path[pathIndex][1]) {
          this.drawBall();
          timeForInterval += 1 / fps;
        } else {
          ++pathIndex;
        }
      }
    }, 1000 / fps);
  }

  drawBall() {
    let newPoint = this.path[pathIndex][0].calculatePosition(timeForInterval - (pathIndex > 0 ? this.path[pathIndex - 1][1] : 0));
    ctx.fillStyle = this.color;
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.rect(0, 0, c.width, c.height);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(newPoint.x, c.height - newPoint.y, this.radius, 0, 6.29);
    ctx.fill();
    ctx.closePath();
  }
}

const c = document.getElementById("c"),
      ctx = c.getContext("2d"),
      bounds = [0, 0, c.width, c.height],
      bouncinessConstant = .90,
      accelerationMulti = 50;

var interval,
    pathIndex,
    timeForInterval;
  
c.width = window.innerWidth;
c.height = window.innerHeight;

ctx.strokeStyle = "black";
ctx.lineWidth = 1;
ctx.clearRect(0, 0, c.width, c.height);
ctx.rect(0, 0, c.width, c.height);

ball = new Ball(new Point(150, 150), new Vector(1000, 500), 80, "white");
ball.drawPath(.1);
ball.drawBallOnPath(30);