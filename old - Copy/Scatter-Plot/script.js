const marginL = 20,
      marginR = 5,
      marginU = 20,
      marginD = 5,
      graph = data => {
        clearCanvas();
        drawLn([marginL, marginU], [marginL, 100 - marginD], 3, 'white');
        drawLn([marginL, marginU], [100 - marginR, marginU], 3, 'white');
        drawTxt([marginL - marginL / 5, 30], 'Test 1234567890', 0.6, 'white', marginL * 3 / 5, canvas.width * 20 / 470 + 'px serif', 'end', 0, 1);
      };