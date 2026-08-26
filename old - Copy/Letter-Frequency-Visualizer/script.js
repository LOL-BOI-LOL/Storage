const alphabet = Array.from(Array(26)).map((v, i) => String.fromCharCode(i + 97));

const drawRect = (pos, dim, clr, clr2 = null, lineW = null) => {
  ctx.fillStyle = clr;
  ctx.fillRect(...pos, ...dim);
  if(clr2 && lineW) {
    ctx.strokeStyle = clr2;
    ctx.lineWidth = lineW;
    ctx.strokeRect(...pos, ...dim);
  }
};

const drawText = (pos, msg, clr, size, maxSize = null) => {
  ctx.fillStyle = clr;
  ctx.font = size + 'px serif';
  if(maxSize != null)
    ctx.fillText(msg, ...pos, maxSize);
  else
    ctx.fillText(msg, ...pos);
};

const drawGraph = str => {
  clearCanvas();
  let temp0 = [];
  let temp1 = [];
  str.toLowerCase().split('').forEach(v => {
    if(alphabet.indexOf(v) != -1)
      temp0.push(v);
  });
  alphabet.forEach(v => temp1.push([v, temp0.filter(val => v == val).length]));
  let min = 0; //Math.min(...temp1.map(v => v[1]));
  let max = Math.max(...temp1.map(v => v[1]));
  temp1.forEach((v, i) => {
    drawRect([i * 0.9 * canvas.width/temp1.length + canvas.width / 10, 9/10 * canvas.height], [9 / 10 * canvas.width / temp1.length, (-1 * (v[1] - min) / (max - min)) * (8 / 10 * canvas.height)], 'blue', 'white', 1 * canvas.width/476);
    drawText([(i + 0.2) * 0.9 * canvas.width/temp1.length + canvas.width / 10, 9.5/10 * canvas.height], v[0], 'white', 20 * canvas.width / 476);
    ctx.save();
    ctx.translate(i * 0.9 * canvas.width/temp1.length + canvas.width * 0.1, 0.9 * canvas.height - (v[1] - min) / (max - min) * (0.8 * canvas.height));
    ctx.rotate(1.5 * Math.PI);
    drawText([5 * canvas.width / 476, 0.8 * canvas.width / temp1.length], v[1], 'white', 19 * canvas.width / 476);
    ctx.restore();
  });
};