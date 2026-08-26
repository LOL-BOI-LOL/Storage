const interval = 0.00000001,
      //drag = v => -0.0199195652 * (v ** 2);
      drag = v => -1/2 * 1.225 * 0.507 * 0.0034 * (v ** 2);

function calcDist(v0, a, y0 = 0) {
  let v0x = v0 * Math.cos(a * Math.PI / 180),
      v0y = v0 * Math.sin(a * Math.PI / 180),
      x = 0,
      y = y0,
      vx = v0x,
      vy = v0y,
      highest = 0;
  
  x += vx * interval;
  y += vy * interval;
  
  while (y > 0) {
    vx += drag(vx) * (Math.abs(vx) / vx) * interval;
    vy += (-9.80665 + drag(vy) * (Math.abs(vy) / vy)) * interval;
  
    x += vx * interval;
    y += vy * interval;

    if (y > highest) {
      highest = y;
    }
  }
  
  console.log(x, y, highest, 2 * v0x * v0y / 9.80665);
  return x;
}

function v(a0, af, multi=1) {
  let w = 0,
      angle = a0 * Math.PI / 180,
      a = 190.95835303;
      
  af *= Math.PI / 180;
  angle += w * interval * multi;
  
  while (angle < af) {
    w += (a - 3.29570546559 * Math.sin(angle)) * interval * multi;
    angle += w * interval * multi;
  }

  console.log(w * 0.9494, angle, 135/180 * Math.PI)
  return w * .9494;
}

function v2(i) {
  let k = 239.78,
      a = Math.PI / 2,
      r = 2.4384,
      l = r / Math.sqrt(2),
      I = 13.562933203,
      w = 0,
      count = 0;
  
  while (a > Math.PI / 4) {
    a -= w * i;
    w += k * l * Math.sin(a) * r / I * i;
    count += i;
  }

  console.log(w * r, count, a, Math.PI / 4);
}