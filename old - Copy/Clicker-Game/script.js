const square = document.getElementById('square'),
  shopbtn = document.getElementById('shop'),
  backbtn = document.getElementById('back'),
  arrowl = document.getElementById('arrowl'),
  arrowr = document.getElementById('arrowr'),
  colorinput = document.getElementById('colorinput'),
  colorbuy = document.getElementById('colorbuy'),
  colortype = document.getElementById('colortype'),
  popup = document.getElementById('popup'),
  close = document.getElementById('close'),
  upgradetype = document.getElementById('upgradetype'),
  upgradebuy = document.getElementById('upgradebuy');
var increment = 1;
var shop = 0;
upgradebuy.addEventListener('click', increaseIncrement);
square.addEventListener('click', () => square.innerHTML = Number(getBal()) + increment);
shopbtn.addEventListener('click', toggleshopon);
backbtn.addEventListener('click', toggleshopoff);
colorbuy.addEventListener('click', setColor);
close.addEventListener('click', () => { popup.style.display = 'none'; close.style.display = 'none'; })
arrowl.addEventListener('click', switchshop);
arrowr.addEventListener('click', switchshop);

function increaseIncrement() {
  if (Number(getBal()) >= 100 * Math.pow(2, increment - 1)) {
    square.innerHTML = Number(getBal()) - 100 * Math.pow(2, increment - 1);
    increment += 1;
    upgradebuy.innerHTML = 100 * Math.pow(2, increment - 1) + ' Clicks';
  } else {
    popupshow('Insufficient Clicks');
  }
}

function getBal() {
  return Number(square.innerHTML).toLocaleString('fullwide', { useGrouping: false });
}

function setColor() {
  newc = colorinput.value;
  if (Number(getBal()) >= 100) {
    square.innerHTML = Number(getBal()) - 100;
    square.style.backgroundColor = newc;
  } else {
    popupshow('Insufficient Clicks');
  }
}

function popupshow(message) {
  popup.style.display = 'flex';
  close.style.display = 'block';
  popup.innerHTML = message;
}

function switchshop() {
  shop = 1 - shop;
  if(shop === 0) {
    upgradetype.innerHTML = 'Increment Upgrade';
    upgradebuy.innerHTML = 100 * Math.pow(2, increment - 1) + ' Clicks';
    colortype.innerHTML = 'Square';
    colorbuy.innerHTML = '100 Clicks';
  } else if(shop === 1) {
    upgradetype.innerHTML = 'Multiplier Upgrade';
    upgradebuy.innerHTML = 'PlaceHolder';
    colortype.innerHTML = 'Background';
    colorbuy.innerHTML = '100 Clicks';
  }
}

function toggleshopon() {
  shopbtn.style.display = 'none';
  backbtn.style.display = 'flex';
  arrowl.style.display = 'block';
  arrowr.style.display = 'block';
  colortype.style.display = 'block';
  colorinput.style.display = 'block';
  colorbuy.style.display = 'flex';
  upgradetype.style.display = 'flex';
  upgradebuy.style.display = 'block';
  upgradebuy.innerHTML = 100 * Math.pow(2, increment - 1) + ' Clicks';
}

function toggleshopoff() {
  shopbtn.style.display = 'flex';
  backbtn.style.display = 'none';
  arrowl.style.display = 'none';
  arrowr.style.display = 'none';
  colortype.style.display = 'none';
  colorinput.style.display = 'none';
  colorbuy.style.display = 'none';
  upgradetype.style.display = 'none';
  upgradebuy.style.display = 'none';
}

function setClicks() {
  localStorage.setItem('Clicks', square.innerHTML);
  localStorage.setItem('Color', window.getComputedStyle(square).backgroundColor);
  localStorage.setItem('Increment', increment);
}

function getClicks() {
  if (localStorage.getItem('Clicks') == null) {
    localStorage.setItem('Clicks', 0);
  }
  if (localStorage.getItem('Color') == null) {
    localStorage.setItem('Color', '#ffffff');
  }
  if (localStorage.getItem('Increment') == null) {
    localStorage.setItem('Increment', '1');
  }
  square.innerHTML = localStorage.getItem('Clicks');
  square.style.backgroundColor = localStorage.getItem('Color');
  increment = parseInt(localStorage.getItem('Increment'));
}