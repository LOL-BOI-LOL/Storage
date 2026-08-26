const drawLine = (posStart, posEnd, lineW = 2, clr = 'white') => {
  ctx.lineWidth = lineW;
  ctx.strokeStyle = clr;
  ctx.beginPath();
  ctx.moveTo(...posStart);
  ctx.lineTo(...posEnd);
  ctx.closePath();
  ctx.stroke();
};

const drawCirc = (pos, radius, lineW = 2, clr = 'white') => {
  ctx.lineWidth = lineW;
  ctx.strokeStyle = clr;
  ctx.beginPath();
  ctx.arc(...pos, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
};

const drawPolygon = (numSides, inscribedCirc = false, circumscribedCirc = false, radi = canvas.width * 2 / 9, clear = true) => {
  if(typeof numSides != 'number' || numSides != Math.floor(numSides) || numSides <= 2)
    throw new Error('Invalid input at function drawPolygon.');
  if(clear)
    clearCanvas();
  let calcAngle = i => {
    let angle;
    if(numSides % 2)
      angle = (Math.PI + i * 2 * Math.PI) / numSides + 1.5 * Math.PI;
    else
      angle = i * 2 * Math.PI / numSides + 1.5 * Math.PI;
    while(angle >= 2 * Math.PI)
      angle -= 2 * Math.PI;
    while(angle < 0)
      angle += 2 * Math.PI;
    return angle;
  };
  for(let i = 0; i < numSides; ++i)
    drawLine([radi * Math.cos(calcAngle(i)) + canvas.width / 2, canvas.height - (radi * Math.sin(calcAngle(i)) + canvas.width / 2)], [radi * Math.cos(calcAngle(i + 1)) + canvas.width / 2, canvas.height - (radi * Math.sin(calcAngle(i + 1)) + canvas.width / 2)]);
  if(inscribedCirc) {
    let apothem = radi * Math.sin(Math.PI * (numSides - 2) / numSides / 2);
    drawCirc([canvas.width / 2, canvas.height / 2], apothem);
  }
  if(circumscribedCirc)
    drawCirc([canvas.width / 2, canvas.height / 2], radi);
  return radi;
};

const drawConcentricPolygons = (numSides, startRadi) => {
  if(typeof numSides != 'number' || numSides != Math.floor(numSides) || numSides <= 2 || typeof startRadi != 'number' || startRadi > canvas.width / 2 || startRadi <= 0)
    throw new Error('Invalid input at function drawConcentricPolygons.');
  let apothToRadi = apothem => apothem / Math.sin(Math.PI * (numSides - 2) / numSides / 2);
  let radi = apothToRadi(drawPolygon(numSides, 1, 1, startRadi));
  while(radi < canvas.width / 2) {
    radi = apothToRadi(drawPolygon(numSides, 1, 1, radi, false));
  }
};