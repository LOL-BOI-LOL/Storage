const offsets = [.1, .1, .05, .05],
      dataPoints = [
        1,
        3,
        3,
        5,
        10,
        20,
        10,
        100,
        0
      ],
      min = Math.min(...dataPoints),
      max = Math.max(...dataPoints);

const convertY = y => canvas.height - ((y - min) / (max - min) * (canvas.height - canvas.height * offsets[1] - canvas.height * offsets[3]) + canvas.height * offsets[1]);
const convertX = i => canvas.width * offsets[0] + i * (canvas.width - canvas.width * offsets[0] - canvas.width * offsets[2]) / dataPoints.length;

const drawData = () => {
  ctx.strokeStyle = "white";
  ctx.strokeWidth = 2;
  ctx.lineJoin = "bevel";
  ctx.beginPath();
  dataPoints.forEach((v, i) => {
    if (i == 0)
      ctx.moveTo(convertX(0), convertY(v));
    else
      ctx.lineTo(convertX(i), convertY(v));
  });
  ctx.stroke();
  ctx.closePath();
};
