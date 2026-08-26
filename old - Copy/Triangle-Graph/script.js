const drawLine = (posStart, posEnd, lineW, clr) => {
  ctx.lineWidth = lineW;
  ctx.strokeStyle = clr;
  ctx.beginPath();
  ctx.moveTo(...posStart);
  ctx.lineTo(...posEnd);
  ctx.stroke();
};

const drawTri = (a, b, c) => {
  clearCanvas();
  drawLine([50, canvas.height - 50], [50 + a, canvas.height - 50], 2, 'white');
  let angleC = Math.acos((a**2 + b**2 - c**2) / (2 * a * b));
  let coords = [50 + b * Math.cos(angleC), canvas.height - 50 - b * Math.sin(angleC)];
  console.log((a**2 + b**2 - c**2) / (2 * a * b));
  drawLine([50, canvas.height - 50], coords, 2, 'white');
  drawLine(coords, [50 + a, canvas.height - 50], 2, 'white');
};