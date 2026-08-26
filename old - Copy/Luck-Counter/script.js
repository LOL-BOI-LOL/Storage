const intervalTime = 10,
      chance = [99, 100],
      btnStart = document.getElementById('btnStart'),
      btnClear = document.getElementById('btnClear'),
      btnCopy = document.getElementById('btnCopy'),
      btnSave = document.getElementById('btnSave'),
      btnLoad = document.getElementById('btnLoad'),
      getRand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
      bodyChildren = () => document.body.childNodes,
      randLuck = (prob) => {
        if(prob[0] / prob[1] >= 1) {
          toggleStart(true);
          throw new Error("Probability Can Not Be Greater Than Or Equal To 1");
        }
        let i = 0;
        while (getRand(0, prob[1]) < prob[0])
          i++;
        while (bodyChildren().length - bodyInitialLength <= i) {
          let p = document.createElement('P');
          p.innerText = 'Luck ' + (bodyChildren().length - bodyInitialLength + 1) + ': 0';
          document.body.appendChild(p);
        }
        let curChildTxt = bodyChildren()[i + bodyInitialLength].innerText.split(': ');
        bodyChildren()[i + bodyInitialLength].innerText = curChildTxt[0] + ': ' + (parseInt(curChildTxt[1]) + 1);
      },
      toggleStart = (excludeStart = false) => {
        if (interval) {
          clearInterval(interval);
          interval = null;
          btnStart.innerText = 'Start';
        } else if(!excludeStart) {
          interval = setInterval(() => randLuck(chance), intervalTime);
          btnStart.innerText = 'Stop';
        }
      },
      getInitialLength = () => {
        if (!bodyInitialLength)
          bodyInitialLength = document.body.childNodes.length;
      },
      removeChildren = () => {
        for (let i = bodyInitialLength; i < bodyChildren().length;)
          document.body.removeChild(bodyChildren()[i]);
      };

var bodyInitialLength;
var interval = null;

btnStart.onclick = () => {
  getInitialLength();
  toggleStart();
}

btnClear.onclick = () => {
  getInitialLength();
  toggleStart(true);
  removeChildren();
}

btnCopy.onclick = () => {
  getInitialLength();
  toggleStart(true);
  let values = [];
  for (let i = bodyInitialLength; i < bodyChildren().length; i++)
    values.push(bodyChildren()[i].innerText);
  navigator.clipboard.writeText(values.join(', '));
  alert('Values Copied To Clipboard');
}
btnSave.onclick = () => {
  getInitialLength();
  toggleStart(true);
  let values = [];
  for (let i = bodyInitialLength; i < bodyChildren().length; i++)
    values.push(bodyChildren()[i].innerText);
  localStorage.setItem('Values', values.join(', '));
  alert('Values Saved To Local Storage');
}
btnLoad.onclick = () => {
  getInitialLength();
  toggleStart(true);
  removeChildren();
  let values;
  try {
    values = localStorage.getItem('Values').split(', ');
  } catch {
    values = [];
  }
  values.forEach(o => {
    let p = document.createElement('P');
    p.innerText = o;
    document.body.appendChild(p);
  });
  alert('Values Loaded From Local Storage');
}