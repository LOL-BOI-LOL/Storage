function stripe(clr, offsetx, offsety, x, y) {
  ctx.strokeStyle = clr;
  ctx.beginPath();
  if (offsety >= 0) {
    ctx.moveTo(x, canvas.height - offsety - y);
    ctx.lineTo(canvas.width - offsety + x, -1 * y);
  } else {
    ctx.moveTo(x - offsety, canvas.height - y);
    ctx.lineTo(canvas.width + x, -1 * offsety - y);
  }
  ctx.stroke();
  ctx.closePath();
}

setTimeout(() => {
  const size = canvas.height / 13;
  const y = [12, 10, 8, 6, 4, 2, 0, -2, -4, -6, -8, -10, -12].map(v => v * size);
  ctx.lineWidth = size;
  ctx.lineCap = "round";
  ctx.font = "50px ";
  let off = 0;
  let interval = setInterval(() => {
    clearCanvas();
    y.forEach((v, i) => stripe(["white", "red"][i % 2], 0, v * [1, -1][i % 2], off * [1, -1][i % 2], off * [1, -1][i % 2]));
    off += 2;
    if (off > canvas.width + size) clearInterval(interval);
  }, 10);
}, 3000);