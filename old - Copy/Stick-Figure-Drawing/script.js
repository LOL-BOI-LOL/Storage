const div = document.getElementsByTagName('DIV')[0];

const dele = () => {
  while(div.firstChild) 
    div.removeChild(div.firstChild);
}

const draw = (img, dim, loc, angle = 0) => {
  let temp = document.createElement('IMG');
  temp.src = 'imgs/' + img + '.svg';
  temp.width = dim;
  temp.style.position = 'absolute';
  temp.style.top = loc[1] + 'px';
  temp.style.left = loc[0] + 'px';
  temp.style.transform = 'rotate(' + angle + 'deg)';
  div.appendChild(temp);
};

const drawBoi = (loc, dim, rot, yOffset) => {
  dele();
  draw('body', dim, loc);
  draw('wheel', dim/1.5, [loc[0]+dim*0.14,loc[1]+dim*1.8+yOffset], rot);
}

const moveBoi = (iLoc, iAngle, dim, time) => {
  for(let i = 0; i < time*100; i+=1) {
    setTimeout(() => {
      let temp = iLoc[0]+i;
      while(temp > window.innerWidth)
        temp -= window.innerWidth+dim;
      drawBoi([temp, iLoc[1]], dim, iAngle + i, 0);
    }, i*10);
  }
}

document.onclick = () => moveBoi([0, window.innerHeight - (246 + 0.05*window.innerHeight/2)], 0, 100, 2*(window.innerWidth/100 + 1));