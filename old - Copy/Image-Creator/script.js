const c   = document.getElementById("c"),
      ctx = c.getContext("2d");

function encode(string, width, height, download = false) {
  ctx.clearRect(0, 0, c.width, c.height);
  
  string = string.toLowerCase();
  
  c.width  = width;
  c.height = height;

  if (height > Math.ceil(string.length / width))
    spacingLines = Math.floor((height - Math.ceil(string.length / width)) / (Math.ceil(string.length / width) + 1));
  
  string.split("").forEach((v, i) => {
    let code = v.charCodeAt(0) - 96;
    
    if (v == " ")
      ctx.fillStyle = "rgb(0,0,0)";
    else
      ctx.fillStyle = "rgb(" + Math.floor(code / 3) + "," + Math.floor(code / 3) + "," + (Math.floor(code / 3) + code % 3) + ")";
    
    ctx.fillRect(i % width, Math.floor(i / width + 1) * (spacingLines + 1) - 1, 1, 1);
  });

  ctx.fillStyle = "rgb(0,0,0)";
  
  for (let i = 0; i < Math.ceil(string.length / width) + 1; ++i)
    ctx.fillRect(0, i * (spacingLines + 1), width, spacingLines);
  ctx.fillRect(string.length % width, Math.floor(string.length / width + 1) * (spacingLines + 1) - 1, width - string.length % width, 1);
  ctx.fillRect(0, Math.ceil(string.length / c.width) * (spacingLines + 1), width, Math.ceil(string.length / c.width) % (height - Math.ceil(string.length / c.width) + 1));
  
  return ctx.getImageData(0, 0, width, height).data;
}

function decode(imageData) {
  let string = "";

  console.log(imageData);
  for (let i = 0; i < imageData.length; ++i) {
    rgb = [imageData[i++], imageData[i++], imageData[i++]];
    if (!rgb.some(v => v))
      continue;
    else
      string += String.fromCharCode(rgb[0] + rgb[1] + rgb[2] + 96);
  }
  
  return string;
}