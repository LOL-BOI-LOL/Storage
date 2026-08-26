const c = document.getElementById('canvas');
const ctx = c.getContext('2d');

function drawBike(x,y,w,c) {
  ctx.lineWidth = w;
  ctx.strokeStyle = c;
  arc(10+w+x,28+w+y,10,0,2*Math.PI);
  arc(60+w+x,28+w+y,10,0,2*Math.PI);
  line(10+w+x,30+w+x,28+w+y,28+w+y);
  line(10+w+x,25+w+x,28+w+y,8+w+y);
  line(20+w+x,30+w+x,3+w+y,28+w+y);
  line(55+w+x,60+w+x,8+w+y,28+w+y);
  line(25+w+x,55+w+x,8+w+y,8+w+y);
  line(30+w+x,55+w+x,28+w+y,8+w+y);
  line(15+w+x,28+w+x,3+w+y,3+w+y);
  line(53+w+x,55+w+x,0+w+y,8+w+y);
  line(35+w+x,53+w+x,0+w+y,0+w+y);
}

function arc(x,y,r,a1,a2) {
  ctx.beginPath();
  ctx.arc(x,y,r,a1,a2);
  ctx.stroke();
}
function line(x1,x2,y1,y2) {
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}