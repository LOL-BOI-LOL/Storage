const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

gl.clearColor(0.0, 0.0, 0.0, 1.0);

const resizeCanvas = () => {
  canvas.width = Math.min(window.innerWidth, window.innerHeight);
  canvas.height = canvas.width;
  fillCanvas();
}

const fillCanvas = () => {
  gl.clear(gl.COLOR_BUFFER_BIT);  
}

document.body.onload = () => resizeCanvas();
window.onresize = () => resizeCanvas();