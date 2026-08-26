img = document.getElementById('img');
img.addEventListener('click',focus);
newimg = document.getElementById('focusedImage');
x = document.getElementById('focusExit');
x.addEventListener('click',unfocus);
alltags = document.getElementsByTagName('*');
focused = false;
function focus() {
  focused = true;
  let start = 0;
  let end = 0;
  for(let i = 0; i < alltags.length; i++) {
    if(alltags[i.toString()].toString() == '[object HTMLBodyElement]') {
      start = i;
    }else if(alltags[i.toString()].toString() == '[object HTMLScriptElement]') {
      end = i;
    }
  }
  for(let i = start + 1; i < end; i++) {
    alltags[i.toString()].style.display = 'none';
  }
  x.style.display = 'block';
  newimg.style.display = 'block';
  newimg.src = img.src.split('/').pop();
}
function unfocus() {
  focused = false;
  let start = 0;
  let end = 0;
  for(let i = 0; i < alltags.length; i++) {
    if(alltags[i.toString()].toString() == '[object HTMLBodyElement]') {
      start = i;
    }else if(alltags[i.toString()].toString() == '[object HTMLScriptElement]') {
      end = i;
    }
  }
  for(let i = start + 1; i < end; i++) {
    alltags[i.toString()].style.display = 'block';
  }
  x.style.display = 'none';
  newimg.style.src = '';
}