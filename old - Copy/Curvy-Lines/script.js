const strtDeg = 90,
      angChange = 1,
      stepMulti = 0.6,
      maxSplits = 3,
      leftOdds = [0, 9], //1 in 10
      rightOdds = [0, 9], // 1 in 10
      endOdds = [0, 499], //1 500 
      newOdds = [0, 99], //1 100
      leftMaxBias = 9,
      rightMaxBias = -9,
      leftBiasMulti = 1/2,
      rightBiasMulti = 1/2,
      antiCircMin = 180,
      antiCircMulti = 1.5,
      endBiasMulti = 1/2,
      endMinAngle = 30,
      genExpo = 6,
      genMin = 3,
      newMin = 30,
      maxLns = 500,
      leftAntiUniMulti = 5,
      rightAntiUniMulti = 5;

const clrInterval = () => {
  if(interval) clearInterval(interval);
  interval = null;
  console.log('Interval Cleared!');
};

const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

const drawLn = (pos1, pos2, w, clr) => {
  ctx.strokeWidth = w;
  ctx.strokeStyle = clr;
  ctx.beginPath();
  ctx.moveTo(...pos1);
  ctx.lineTo(...pos2);
  ctx.stroke();
};

const fillBg = clr => {
  ctx.fillStyle = clr;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const createLn = () => {
  clrInterval();
  clearCanvas();
  fillBg();
  curPos = [[canvas.width/2, canvas.height, 0, strtDeg, 0, 0, 0]]
  interval = setInterval(() => {
    curPos.forEach((v, i) => growLn(...v, i))
    if(!curPos.length)
      clrInterval();
  }, 10);
};

const growLn = (x, y, a, strtA, s, gen, i) => {
  if(x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height && !(randInt(endOdds[0], endOdds[1]  - Math.abs(a) * endBiasMulti - (gen >= genMin ? gen ** genExpo : 0)) <= 0 && Math.abs(a) >= endMinAngle)) {
    let s2 = s;
    if(s < maxSplits && randInt(newOdds[0], newOdds[1] - Math.abs(a)) <= 0 && a >= newMin && curPos.length < maxLns) {
      s2++;
      let a3 = a + strtA;
      while(a3 >= 360)
        a3 -= 360;
      while(a3 < 0)
        a3 += 360;
      curPos.push([x, y, 0, a3, 0, gen + 1, curPos.length]);
    }
    let antiUni = 0;
    if(a == 0) {
     let avg = 0;
      curPos.forEach(v => {
        if(v[2] > 0)
          avg += 1;
        else if(v[2] < 0)
          avg -= 1;
      });
      avg /= curPos.length;
      if(avg > 0) 
        antiUni = 1;
      else if(avg < 0)
        antiUni = -1;
    }
    let a2 = a;
    if(randInt(leftOdds[0], (Math.abs(a) >= antiCircMin ? antiCircMulti : 1) * (leftOdds[1] - Math.min(leftMaxBias, a * leftBiasMulti) + antiUni * leftAntiUniMulti)) <= 0)
      a2 += angChange;
    else if(randInt(rightOdds[0], (Math.abs(a) >= antiCircMin ? antiCircMulti : 1) * (rightOdds[1] + Math.max(rightMaxBias, a * rightBiasMulti) - antiUni * rightAntiUniMulti)) <= 0)
      a2 -= angChange;
    if(Math.abs(a) >= 180) {
      console.log(randInt(rightOdds[0], (Math.abs(a) >= antiCircMin ? antiCircMulti : 1) * (rightOdds[1] + Math.max(rightMaxBias, a * rightBiasMulti) - antiUni * rightAntiUniMulti)) <= 0, (Math.abs(a) >= antiCircMin ? antiCircMulti : 1));
    }
    let x2 = x + Math.cos((a+strtA)*Math.PI/180) * stepMulti;
    let y2 = y - Math.sin((a+strtA)*Math.PI/180) * stepMulti;
    drawLn([x, y], [x2, y2], 3, 'white');
    curPos[i] = [x2, y2, a2, strtA, s2, gen, i];
  } else {
    curPos.splice(i, 1);
    curPos.forEach((v, i2) => {
      if(i2 >= i)
        v[6] = i2;
    });
  }
};

const save = () => {
  window.open(canvas.toDataURL('image/png').replace("image/png", "image/octet-stream"), '_blank');
};

canvas.ontouchend = createLn;
canvas.onclick = createLn;
canvas.onkeydown = () => {
  if(event.key == 'Backspace')
    save();
  else if(event.key == ' ')
    createLn();
  console.log(event.key);
};
var interval = null;
var curPos = [];