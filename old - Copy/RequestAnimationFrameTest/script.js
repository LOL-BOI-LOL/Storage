const p = document.getElementById("txt");
      func = () => {
        let time = performance.now();
        console.log("strt");
        if (num < 1) {
          for (let i = 0; i < 999999; ++i);
          p.innerText = "hi";
          ++num;
          requestAnimationFrame(func);
        }
        console.log(performance.now() - time);
      },
      loopFunc = () => {
        console.log("f");
        let x = Math.pow(921.3112321, 12);
        if (num < 1)
          setTimeout(loopFunc, 1);
      };

var num = 0;

requestAnimationFrame(func);

loopFunc();