var progress = 0;
var speed = 100;
function movebar() {
  document.getElementById('rbar').style.width = progress.toString()+'%';
  if(progress < 100) {
    progress = progress+0.1;
  } else {
    progress = 0;
    document.getElementById('ramount').innerHTML = parseInt(document.getElementById('ramount').innerHTML,10) + 1;
  }
}
function smovebar() {
  bar = setInterval(movebar,speed);
  console.log(speed);
}
function upgrader() {
  clearInterval(bar);
  speed = speed-5;
  if(speed <= 5) {
    speed = 5;
  }
  smovebar();
}