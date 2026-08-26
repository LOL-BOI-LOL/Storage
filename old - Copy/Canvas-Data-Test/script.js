const canvasMain = document.getElementById("main"),
      canvasSecond = document.getElementById("second"),
      ctxM = canvasMain.getContext("2d"),
      ctxS = canvasSecond.getContext("2d");

canvasMain.width = 200;
canvasMain.height = 200;
canvasSecond.width = 200;
canvasSecond.height = 200;

ctxM.fillStyle = "black";
ctxM.fillRect(0, 0, 200, 200);
ctxS.fillStyle = "green";
ctxS.fillRect(0, 0, 200, 200);

ctxM.clearRect(0, 0, 200, 200);
var arr = [ctxS.getImageData(0, 0, 200, 200)];
ctxM.putImageData(arr[0], 0, 0);