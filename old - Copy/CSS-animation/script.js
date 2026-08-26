const boi = document.getElementById('daBoi');
boi.style.transform = 'rotate(0deg)';

const getVal = str => parseFloat(str.replaceAll(/[^0-9.-]/ig, ''));

const getProp = (el, prop) => window.getComputedStyle(el)[prop];

document.onclick = () => {
  let curRot = getVal(boi.style.transform);
  curRot += 90;
  curRot = 'rotate(' + curRot + 'deg)';
  boi.style.transform = curRot;
  let dim = [getVal(getProp(boi, 'width')), getVal(getProp(boi, 'height'))];
  let newMargins = [event.clientX - dim[0]/2, event.clientY - dim[1]/2];
  if(newMargins[0] + dim[0] > window.innerWidth)
    boi.style.marginLeft = window.innerWidth - dim[0] + 'px';
  else if(newMargins[0] < 0)
    boi.style.marginLeft = 0 + 'px';
  else
    boi.style.marginLeft = newMargins[0] + 'px';
  if(newMargins[1] + dim[1] > window.innerHeight)
    boi.style.marginTop = window.innerHeight - dim[1] + 'px';
  else if(newMargins[1] < 0)
    boi.style.marginTop = 0 + 'px';
  else
    boi.style.marginTop = newMargins[1] + 'px';
};