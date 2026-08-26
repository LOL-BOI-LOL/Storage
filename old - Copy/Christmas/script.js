const body = document.getElementsByTagName('BODY')[0];
var interval;

function createsantas() {
  let incrementX = Math.floor(Math.random()*60)-30;
  let incrementY = Math.floor(Math.random()*60)-30;
  let randX = Math.floor(Math.random()*window.innerWidth);
  let randY = Math.floor(Math.random()*window.innerHeight);
  let div = document.createElement('DIV');
  body.appendChild(div);
  let origsanta = document.createElement('P');
  origsanta.style.marginTop = randY+'px';
  origsanta.style.marginLeft = randX+'px';
  origsanta.innerHTML = '&#127877';
  div.appendChild(origsanta);
  interval = setInterval(function(){newsantas(div, incrementX, incrementY)}, 50);
}
function newsantas(div, incrementX, incrementY) {
  if(parseInt(Array.from(div.childNodes).at(-1).style.marginLeft.split('p')[0]) + parseInt(window.getComputedStyle(Array.from(div.childNodes).at(-1)).width.split('p')[0]) < window.innerWidth && parseInt(Array.from(div.childNodes).at(-1).style.marginTop.split('p')[0]) + parseInt(window.getComputedStyle(Array.from(div.childNodes).at(-1)).height.split('p')[0]) < window.innerHeight && parseInt(Array.from(div.childNodes).at(-1).style.marginLeft.split('p')[0]) > 0 && parseInt(Array.from(div.childNodes).at(-1).style.marginTop.split('p')[0]) > 0) {
    newsanta(div, incrementX, incrementY);
  } else {
    clearInterval(interval);
    createsantas();
  }
}
function newsanta(div, incrementX, incrementY) {
  let lastsanta = Array.from(div.childNodes).at(-1);
  let newsanta = document.createElement('P');
  newsanta.style.marginTop = parseInt(lastsanta.style.marginTop.split('p')[0]) + incrementY + 'px';
  newsanta.style.marginLeft = parseInt(lastsanta.style.marginLeft.split('p')[0]) + incrementX + 'px';
  newsanta.innerHTML = '&#127877';
  div.appendChild(newsanta);
}

function fillscreen(origin) {
  let div = document.createElement('DIV');
  body.appendChild(div);
  let origsanta = document.createElement('P');
  origsanta.style.marginTop = origin;
  origsanta.style.marginLeft = '-50px';
  origsanta.innerHTML = '&#127877';
  div.appendChild(origsanta);
  interval = setInterval(function(){fillscreen2(div)}, 100);
}
function fillscreen2(div) {
  if(parseInt(Array.from(div.childNodes).at(-1).style.marginLeft.split('p')[0]) <= window.innerWidth) {
    fillscreen3(div);
  } else {
    clearInterval(interval);
    fillscreen(parseInt(Array.from(div.childNodes).at(-1).style.marginTop.split('p')[0]) + 90 + 'px');
  }
}
function fillscreen3(div) {
  let lastsanta = Array.from(div.childNodes).at(-1);
  let newsanta = document.createElement('P');
  newsanta.style.marginTop = lastsanta.style.marginTop;
  newsanta.style.marginLeft = parseInt(lastsanta.style.marginLeft.split('p')[0]) + 20 + 'px';
  newsanta.innerHTML = '&#127877';
  div.appendChild(newsanta);
}

createsantas();