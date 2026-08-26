const divTopPH = document.getElementById('divTitlePlaceHolder');

const imgEnlarged = parent.document.getElementById('imgEnlarged');

const divPopUp = parent.document.getElementById('divPopUp');

const divBlur = parent.document.getElementById('divBlur');

const divTop = parent.document.getElementById('divTop');

window.addEventListener('resize', setSize);

window.addEventListener('orientationchange', setSize);

function clickImgs() {
  let imgs = document.getElementsByTagName('IMG');
  for (i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', clickedImg);
  }
}

function clickedImg() {
  let imgOriginalH = parseInt(window.getComputedStyle(this).height.split('p').shift());
  let imgOriginalW = parseInt(window.getComputedStyle(this).width.split('p').shift());
  imgEnlarged.src = this.src;
  divPopUp.style.display = 'flex';
  divBlur.style.display = 'block';
  /*
  if (window.innerWidth < window.innerHeight) {
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
  imgEnlarged.style.margin = ((100 * (((window.innerHeight - parseInt(window.getComputedStyle(imgEnlarged).height.split('p').shift())) / 2) - 1)) / window.innerHeight.toString() + 'vh ' + (100 * (((window.innerWidth - parseInt(window.getComputedStyle(imgEnlarged).width.split('p').shift())) / 2) - 1)) / window.innerWidth.toString() + 'vw');
  */
}

function setSize() {
  divTopPH.style.height = (100 * (parseInt(window.getComputedStyle(divTop).height.split('p').shift()) + 20) / window.innerWidth).toString() + 'vw';
}

function waitUntilLoaded() {
  setTimeout(setSize, 100);
  setTimeout(clickImgs, 100);
}