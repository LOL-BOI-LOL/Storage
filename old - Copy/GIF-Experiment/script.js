const rect = (pos, dim, clr) => {
  ctx.fillStyle = clr;
  ctx.fillRect(...pos, ...dim);
};

setTimeout(() => {
  canvas.style.border = '1px solid white';
  for(let i = 0; i < 10; i++)
    for(let i2 = 0; i2 < 10; i2++)
      rect([i,i2],[1,1],['red','green','blue','yellow'][Math.floor(Math.random()*4)]);
}, 1000);