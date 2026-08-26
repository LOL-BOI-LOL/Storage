const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const resizeCanvas = () => {
  canvas.width = 10;
  canvas.height = 10;
  clearCanvas();
}

const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

document.body.onload = () => resizeCanvas();
window.onresize = () => resizeCanvas();