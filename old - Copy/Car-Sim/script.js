const track = document.getElementById('track');
const trackstyle = () => window.getComputedStyle(track);
function trackmargin(o, a) {
  try {
    if(o == 'h') {
      track.style.marginLeft = parseFloat(trackstyle().marginLeft) + a + 'px';
    } else if(o == 'v') {
      track.style.marginTop = parseFloat(trackstyle().marginTop) + a + 'px';
    } else {
      throw 'Invalid Orientation';
    }
  }
  catch(e) {
    console.error(e);
  }
}
function move() {
  event.key == 'w' ? trackmargin('v', -10) : event.key == 's' ? trackmargin('v', 10) : event.key == 'a' ? trackmargin('h', -10) : event.key == 'd' ? trackmargin('h', 10) : '';
}
document.addEventListener('keypress', move);