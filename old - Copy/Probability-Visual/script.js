const canvas         = document.getElementById("canvas"),
      ctx            = canvas.getContext("2d"),
      ratio          = x => canvas.width * x / 100;
      drawLine       = ({path, w, clr = 'white', joint = 'round'}) => {
        ctx.lineWidth = w;
        ctx.strokeStyle = clr;
        ctx.lineJoin = joint;
          
        ctx.beginPath();
        path.forEach(loc => ctx.lineTo(...loc.map(v => ratio(v))));
        ctx.stroke();
        ctx.closePath();
      },
      numberOfTrials = 84 * 100,
      totalMulti     = 0.1;

var total   = 0,
    counter = 0,
    interval;

setTimeout(() => {
  let length          = Math.min(window.innerWidth, window.innerHeight);
  canvas.style.width  = length + 'px';
  canvas.style.height = length + 'px';
  canvas.width        = window.devicePixelRatio * length;
  canvas.height       = window.devicePixelRatio * length;
  
  ctx.fillRect(0, 0, ratio(100), ratio(100));
  ctx.rect(0, 0, ratio(100), ratio(100));
  ctx.strokeStyle = 'white';
  ctx.lineWidth   = 1;
  ctx.stroke();

  drawLine({path: [[7, 5], [7, 95]],              w: 3                });
  drawLine({path: [[3, 50], [95, 50]],            w: 3                });
  drawLine({path: [[6, 6], [7, 5], [8, 6]],       w: 3, joint: 'miter'});
  drawLine({path: [[6, 94], [7, 95], [8, 94]],    w: 3, joint: 'miter'});
  drawLine({path: [[4, 51], [3, 50], [4, 49]],    w: 3, joint: 'miter'});
  drawLine({path: [[94, 51], [95, 50], [94, 49]], w: 3, joint: 'miter'});
  for (let i = 0; i < 21; ++i)
    drawLine({path: [[6.3, 90 - 4 * i], [7.7, 90 - 4 * i]], w: 2});

  interval = setInterval(() => {
    let clr    = 'red',
        change = -5;
      
    if(Math.floor(Math.random() * 6)) {
      clr    = 'green';
      change = 1;
    }
    total += change;
    
    drawLine({path: [[7 + 84 / numberOfTrials * counter, 50 - (totalMulti * total - change)], [7 + 84 / numberOfTrials * ++counter, 50 - totalMulti * total]], w: 2, clr: clr});
    
    if (counter >= numberOfTrials) {
      clearInterval(interval);
      interval = null;
    }
  }, 1);
}, 100);