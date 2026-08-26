const boi = document.getElementById('boi'),
      div = document.getElementById('div');

const resizeDiv = () => {
  div.style.width = Math.min(window.innerWidth, window.innerHeight) + 'px';
  div.style.height = Math.min(window.innerWidth, window.innerHeight) + 'px';
}

document.body.onload = () => resizeDiv();
window.onresize = () => resizeDiv();

const numReg = /[^0-9.-]/ig;
const getVal = (el, type) => parseFloat(window.getComputedStyle(el)[type].replaceAll(numReg, ''));

const move = (key) => {
  if(key == 'w')
    boi.style.bottom = getVal(boi, 'bottom') + 0.01 * getVal(div, 'height') + 'px';
  else if(key == 's')
    boi.style.bottom = getVal(boi, 'bottom') - 0.01 * getVal(div, 'height') + 'px';
  else if(key == 'a')
    boi.style.left = getVal(boi, 'left') - 0.01 * getVal(div, 'width') + 'px';
  else if(key == 'd')
    boi.style.left = getVal(boi, 'left') + 0.01 * getVal(div, 'width') + 'px';
}

const keyStates = { w: 0, s: 0, a: 0, d: 0 };

document.onkeydown = () => {
  Object.entries(keyStates).forEach(v => {
    if(v[0] == event.key)
      keyStates[v[0]] = 1;
    if(keyStates[v[0]])
      move(v[0]);
  });
}

document.onkeyup = () => {
  Object.entries(keyStates).forEach(v => {
    if(v[0] == event.key)
      keyStates[v[0]] = 0;
  });
}