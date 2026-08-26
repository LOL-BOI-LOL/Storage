const canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height),
      resizeCanvas = () => {
        canvas.width = Math.min(window.innerWidth, window.innerHeight);
        canvas.height = canvas.width;
        scale = canvas.width / 100;
        
        clearCanvas();
      },
      drawLn = (coords0, coords1, width, color) => {
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(coords0[0] * scale, canvas.height - coords0[1] * scale);
        ctx.lineTo(coords1[0] * scale, canvas.height - coords1[1] * scale);
        ctx.stroke();
      },
      drawCirc = (coords, radius, strtAngle, endAngle, width, color, stroke, fill) => {
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(coords[0] * scale, canvas.height - coords[1] * scale, radius, strtAngle, endAngle);
        if(stroke)
          ctx.stroke();
        if(fill)
          ctx.fill();
      },
      drawTxt = (coords, txt, width, color, maxWidth, font, textAlign, stroke, fill) => {
        ctx.lineWidth = width;
        ctx.font = font;
        ctx.textAlign = textAlign;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        if(stroke)
          ctx.strokeText(txt, coords[0] * scale, coords[1] * scale, maxWidth * scale);
        if(fill)
          ctx.fillText(txt, coords[0] * scale, coords[1] * scale, maxWidth * scale);
      };

var scale;

document.body.onload = resizeCanvas;
window.onresize = resizeCanvas;
screen.orientation.change = resizeCanvas;