const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const resizeCanvas = () => {
  if(window.innerWidth <= window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
  } else {
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;
  }
  clearCanvas();
}

const clearCanvas = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.onresize = resizeCanvas;
document.body.onload = resizeCanvas;

const drawRect = (pos, dim, clr) => {
  ctx.fillStyle = clr;
  ctx.fillRect(pos[0], pos[1], dim[0], dim[1]);
}

const randConditional = (amount, value, sign) => {
  let res = true;
  for(let i = 0; i < amount; i++) {
    if(sign === 0)
      if(Math.random() >= value)
        res = false;
    if(sign === 1)
      if(Math.random() <= value)
        res = false;
  }
  return res;
}

const randYPos = prev => {
  if(randConditional(1, 0.7, 0))
    return prev;
  else if(randConditional(1, prev/(canvas.height/2), 1))
    return prev + 5;
  else if(randConditional(1, prev/(canvas.height/2), 0))
    return prev - 5;
  else
    return prev;
}

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randHole = prev => {
  if(!prev)
    prev = [randInt(canvas.height/1.5, canvas.height/2), randInt(40, 20)];
  let temp = [];
  if(randConditional(7, 0.5, 1))
    return NaN;
  else if(randConditional(1, 0.3, 0) && prev[0] + 5 < canvas.height-20)
    temp.push(prev[0]+5);
  else if(randConditional(1, 0.4, 0) && prev[0] - 5 > canvas.height/2)
    temp.push(prev[0]-5);
  else
    temp.push(prev[0]);
  if(randConditional(1, 0.4, 0) && prev[0] + prev[1] + 5 < canvas.height - 20)
    temp.push(prev[1]+5);
  else if(randConditional(1, 0.3, 0) && prev[1] - 5 > 20)
    temp.push(prev[1]-5);
  else
    temp.push(prev[1]);
  return temp;
}

const drawAcross = amount => {
  clearCanvas();
  let width = canvas.width/amount;
  let height = 5;
  let cur;
  let prev = 2*canvas.height/5;
  let prev2;
  drawRect([0,0], [canvas.width, canvas.height], 'lightblue');
  for(let i = 0; i < amount; i++) {
    prev = randYPos(prev);
    drawRect([width*i, prev], [width, height], 'green');
    drawRect([width*i, prev + height], [width, canvas.height-prev-height], 'brown');
    prev2 = randHole(prev2);
    if(prev2)
      drawRect([width*i, prev2[0]], [width, prev2[1]], 'black');
  }
}

canvas.onclick = () => drawAcross(1000);