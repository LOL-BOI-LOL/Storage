const box = document.getElementById('box');
//box.onload = flip();

function flip() {
  for(let i = 0; i < 194; i++) {
    if(i < 97) {
      setTimeout(up, 10 * i);
    }else if(i >= 97) {
      setTimeout(down, 10 * i);
    }
    if(i < 180) {
      setTimeout(turn, 10 * i);
    }
  }
  box.style.transform = 'rotate(0deg)';
  setTimeout(flip,1800);
}

function turn() {
  box.style.transform = "rotate(".concat((parseInt(box.style.transform.split("(").pop().split("d").shift()) + 1).toString().concat("deg)"));
}

function up() {
  box.style.marginTop = (parseInt(box.style.marginTop.split('px')) - 1).toString().concat('px');
}

function down() {
  box.style.marginTop = (parseInt(box.style.marginTop.split('px')) + 1).toString().concat('px');
}