const iframe = document.getElementsByTagName('IFRAME')[0];
const audio = document.getElementById('Audio');
const imgEnlarged = document.getElementById('imgEnlarged');
const divPopUp = document.getElementById('divPopUp');
const divBlur = document.getElementById('divBlur');
const musicToggle = document.getElementById('divMusic').childNodes[1];
const imgs = document.getElementsByTagName('IMG');
const links = document.getElementsByClassName('txtLink');
musicToggle.addEventListener('click', toggleMusic);
document.getElementById('txtDropDown').addEventListener("click", toggleDropDown);
divBlur.addEventListener('click', scrnUnblur);
for (i = 0; i < links.length; i++) {
  links[i].addEventListener('click', changeInfo);
}
for (i = 0; i < imgs.length; i++) {
  imgs[i].addEventListener('click', enlargeImg);
}

window.addEventListener('resize', setSize);

window.addEventListener('orientationchange', setSize);

function toggleDropDown() {
  let links = document.getElementById('divLinks').childNodes;
  let state = window.getComputedStyle(links[1]).display;
  if (state == 'none') {
    state = 'block';
  } else if (state == 'block') {
    state = 'none';
  }
  for (i = 1; i < links.length; i += 2) {
    links[i].style.display = state;
  }
}
function scrnUnblur() {
  divPopUp.style.display = 'none';
  divBlur.style.display = 'none';
  imgEnlarged.src = '';
}
function toggleMusic() {
  if (musicToggle.checked) {
    audio.play();
  } else {
    audio.pause();
  }
}
function enlargeImg() {
  let imgOriginalH = parseInt(window.getComputedStyle(this).height.split('p').shift());
  let imgOriginalW = parseInt(window.getComputedStyle(this).width.split('p').shift());
  imgEnlarged.src = this.src;
  divPopUp.style.display = 'flex';
  divBlur.style.display = 'block';
  /*if (window.innerWidth < window.innerHeight) {
    imgEnlarged.style.width = '50%';
    imgEnlarged.style.height = (100 * ((window.innerWidth / 2) / imgOriginalW) * imgOriginalH) / window.innerHeight.toString() + 'vh';
  } else if (window.innerWidth > window.innerHeight) {
    imgEnlarged.style.width = (100 * ((window.innerHeight / 2) / imgOriginalH) * imgOriginalW) / window.innerWidth.toString() + 'vw';
    imgEnlarged.style.height = '50%';
  } else {
    if (imgOriginalW < imgOriginalH) {
      imgEnlarged.style.width = '50%';
      imgEnlarged.style.height = (100 * ((window.innerWidth / 2) / imgOriginalW) * imgOriginalH) / window.innerHeight.toString() + 'vh';
    } else if (imgOriginalW > imgOriginalH) {
      imgEnlarged.style.width = (100 * ((window.innerHeight / 2) / imgOriginalH) * imgOriginalW) / window.innerWidth.toString() + 'vw';
      imgEnlarged.style.height = '50%';
    } else {
      imgEnlarged.style.width = '50%';
      imgEnlarged.style.height = '50%';
    }
  }
  imgEnlarged.style.margin = ((100 * (((window.innerHeight - parseInt(window.getComputedStyle(imgEnlarged).height.split('p').shift())) / 2) - 1)) / window.innerHeight.toString() + 'vh ' + (100 * (((window.innerWidth - parseInt(window.getComputedStyle(imgEnlarged).width.split('p').shift())) / 2) - 1)) / window.innerWidth.toString() + 'vw');*/
}
function changeInfo() {
  let newsrc = window.location.href + this.id.split('btn')[1].toLowerCase() + '.html';
  if (iframe.src.toLowerCase() !== newsrc.toLowerCase()) {
    iframe.src = newsrc;
  }
}
function setSize() {
  console.log('');
  /*
  if (window.getComputedStyle(imgEnlarged).display == 'block') {
    let imgW = parseInt(imgEnlarged.naturalWidth);
    let imgH = parseInt(imgEnlarged.naturalHeight);
    if (window.innerWidth < window.innerHeight) {
      imgEnlarged.style.height = ((100 * ((window.innerWidth / 2) / imgW) * imgH) / window.innerHeight).toString() + 'vh';
      imgEnlarged.style.width = '50%';
    } else if (window.innerWidth > window.innerHeight) {
      imgEnlarged.style.width = ((100 * ((window.innerHeight / 2) / imgH) * imgW) / window.innerWidth).toString() + 'vw';
      imgEnlarged.style.height = '50%';
    } else {
      if(imgW > imgH) {
        imgEnlarged.style.width = ((100 * ((window.innerHeight / 2) / imgH) * imgW) / window.innerWidth).toString() + 'vw';
        imgEnlarged.style.height = '50%';
      }else if(imgH > imgW) {
        imgEnlarged.style.height = ((100 * ((window.innerWidth / 2) / imgW) * imgH) / window.innerHeight).toString() + 'vh';
        imgEnlarged.style.width = '50%';
      } else {
        imgEnlarged.style.width = '50%';
        imgEnlarged.style.height = '50%';
      }
    }
    imgEnlarged.style.margin = ((100 * (((window.innerHeight - parseInt(window.getComputedStyle(imgEnlarged).height.split('p').shift())) / 2) - 1)) / window.innerHeight.toString() + 'vh ' + (100 * (((window.innerWidth - parseInt(window.getComputedStyle(imgEnlarged).width.split('p').shift())) / 2) - 1)) / window.innerWidth.toString() + 'vw');
  }*/
}
setTimeout(toggleMusic, 1000);