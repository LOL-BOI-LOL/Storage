var keystates = {
  'w': '',
  's': '',
  'a': '',
  'd': '',
  'q': '',
  'e': '',
  'Shift': false
};

document.onkeydown = e => {
  let key = e.key;
  console.log(key);
  if(!keystates[key]) {
    if(key == 'LShift') {
      keystates[key] = true;
    } else {
      keystates[key] = setInterval(() => {keyfunc(key)}, 100);
    }
  }
}

document.onkeyup = e => {
  let key = e.key + '';
  clearInterval(keystates[key]);
  keystates[key] = '';
}

function keyfunc(letter) {
  if(letter == 'w') {
  } else if(letter == 's') {
  } else if(letter == 'a') {
  } else if(letter == 'd') {
  } else if(letter == 'q') {
  } else if(letter == 'e') {
  }
}