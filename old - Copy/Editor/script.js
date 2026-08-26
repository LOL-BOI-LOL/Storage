const container = document.getElementById('designarea');
const xval = document.getElementById('x');
const yval = document.getElementById('y');
const zval = document.getElementById('z');
const wval = document.getElementById('w');
const hval = document.getElementById('h');
const cval = document.getElementById('c');
const rval = document.getElementById('r');
const submit = document.getElementById('submit');
var x;
var y;
var square;

container.addEventListener('mousedown', logMouseCoord);
container.addEventListener('mouseup', draw);
container.addEventListener('mouseleave', clearMouseCoord);
submit.addEventListener('click', submitChanges);

function logMouseCoord() {
  x = event.clientX;
  y = event.clientY;
}

function clearMouseCoord() {
  x = undefined;
  y = undefined;
}

function draw() {
  if(x !== undefined) {
    let x2 = event.clientX;
    let y2 = event.clientY;
    square = document.createElement('P');
    square.style.border = '1px solid black';
    x < x2 ? square.style.marginLeft = x + 'px': square.style.marginLeft = x2 + 'px';
    y < y2 ? square.style.marginTop = y + 'px': square.style.marginTop = y2 + 'px';
    square.style.width = Math.abs(x - x2) + 'px';
    square.style.height = Math.abs(y - y2) + 'px';
    square.style.backgroundColor = '#FFFFFF';
    square.style.transform = 'rotate(0deg)';
    square.style.position = 'absolute';
    square.style.draggable = 'false';
    container.appendChild(square);
    xval.value = window.getComputedStyle(square).marginLeft;
    yval.value = window.getComputedStyle(square).marginTop;
    zval.value = window.getComputedStyle(square).zIndex;
    wval.value = window.getComputedStyle(square).width;
    hval.value = window.getComputedStyle(square).height;
    cval.value = '#FFFFFF';
    rval.value = square.style.transform.split('(')[1].split(')')[0];
  }
}

function submitChanges() {
  square.style.marginLeft = xval.value;
  square.style.marginTop = yval.value;
  square.style.zIndex = zval.value;
  square.style.width = wval.value;
  square.style.height = hval.value;
  square.style.backgroundColor = cval.value;
  square.style.transform = 'rotate(' + rval.value + ')';
}