const log = console.log;
const body = document.getElementById('body');
const svg = document.getElementById('svg');

svg.setAttribute('width', window.innerWidth);
svg.setAttribute('height', window.innerHeight);

class Rectangle {
  constructor(x1, y1, x2, y2) {
    this.pos = [Math.min(x1, x2), Math.min(y1, y2)];
    this.width = Math.abs(x1 - x2);
    this.height = Math.abs(y1 - y2);
  }

  get area() {
    return this.width * this.height;
  }

  get perimeter() {
    return 2 * this.width + 2 * this.height;
  }

  get diagonal() {
    return Math.sqrt(this.width ** 2 + this.height ** 2);
  }

  draw() {
    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', this.pos[0]);
    rect.setAttribute('y', this.pos[1]);
    rect.setAttribute('width', this.width);
    rect.setAttribute('height', this.height);
    rect.setAttribute('style', 'fill:rgba(0,0,0,0);stroke-width:1;stroke:rgb(0,0,0)');
    svg.appendChild(rect);
  }
}

//Example ↓

var myRect = new Rectangle(10, 110, 110, 10);

[
  'pos',
  'width',
  'height',
  'area',
  'perimeter',
  'diagonal'
].forEach(v => log(myRect[v]));

myRect.draw();