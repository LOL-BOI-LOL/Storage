const gen = document.getElementById('btnGen');
const length = document.getElementById('l');
const divMain = document.getElementById('boxes');

const char = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '+',
  '-',
  '*',
  '/',
  '='
];

var theEquation;

const randInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const randCharFromList = max => char[randInt(0, max)];

const randEquation = (len) => {
  if(len >= 3) {
    if(len == 4) char.unshift('0');
    let equation = '';
    while(!checkEquation(equation)) {
      equation = '';
      let max = char.length - 5;
      for(let i = 0; i < len; i++) {
        if(equation.length == len - 2 && !equation.split('').some(v => v == '='))
          equation += '=';
        else
          equation += randCharFromList(max);
        if(equation[equation.length - 1] == '=' || ['+', '-', '/', '*'].some(v => equation[equation.length - 1] == v) || equation.length == len - 1 || (equation.length == len - 3 && !equation.split('').some(v => v == '=')))
          max = char.length - 5;
        else if(equation.split('').some(v => v == '='))
          max = char.length - 1;
        else
          max = char.length;
      }
    }
    if(len == 4) char.shift();
    return equation;
  }
  return 'Need at a length of at least 3';
}

const checkEquation = (equation) => {
  equation = equation.split('=');
  let temp = [''];
  equation.forEach((val, i) => {
    if(i == 1) temp.push('=', '');
    val.split('').forEach(v => {
      if(isNaN(parseInt(v)))
        temp.push(v, '');
      else
        temp[temp.length - 1] += v;
    });
  });
  temp = temp.map((v, i) => {
    if(!(i % 2))
      return parseInt(v);
    else
      return v;
  });
  temp = eval(eval(temp, 1), 0);
  return temp[0] == temp[2];
}

const eval = (equation, type) => {
  let temp = equation.slice();
  for(let i = 0; i < temp.length; i++) {
    if(type) {
      if(temp[i] == '*') {
        temp.splice(i - 1, 3, temp[i-1] * temp[i + 1]);
        temp = eval(temp, type);
        break;
      } else if(temp[i] == '/') {
        temp.splice(i - 1, 3, temp[i-1] / temp[i + 1]);
        temp = eval(temp, type);
        break;
      }
    } else {
      if(temp[i] == '+') {
        temp.splice(i - 1, 3, temp[i-1] + temp[i + 1]);
        temp = eval(temp, type);
        break;
      } else if(temp[i] == '-') {
        temp.splice(i - 1, 3, temp[i-1] - temp[i + 1]);
        temp = eval(temp, type);
        break;
      }
    }
  }
  return temp;
}

btnGen.onclick = () => {
  btnGen.blur();
  if(l.value >= 3) {
    theEquation = randEquation(parseInt(l.value));
    while(divMain.childNodes.length)
      divMain.removeChild(divMain.firstChild);
    let div = document.createElement('div');
    div.className = 'boxes';
    for(let i = 0; i < theEquation.length; ++i) {
      let p = document.createElement('P');
      p.className = 'charBox';
      div.appendChild(p);
    }
    divMain.appendChild(div);
  }
};

document.onkeydown = () => {
  if(l === document.activeElement || typeof(theEquation) == 'undefined') return null;
  let div = divMain.childNodes[divMain.childNodes.length - 1];
  if(char.indexOf(event.key) != -1 || (theEquation.length == 4 && event.key == '0')) {
    let index = -1;
    for(let i = 0; i < div.childNodes.length; ++i) {
      if(div.childNodes[i].innerText == '') {
        index = i;
        break;
      }
    }
    if(index != -1)
      div.childNodes[index].innerText = event.key;
  } else if(event.key == 'Backspace') {
    let index = -1;
    for(let i = div.childNodes.length - 1; i >= 0; --i) {
      if(div.childNodes[i].innerText != '') {
        index = i;
        break;
      }
    }
    if(index != -1) {
      div.childNodes[index].innerText = '';
      div.childNodes[index].style.backgroundColor = 'gray';
    }
  } else if(event.key == 'Enter') {
    if(Object.entries(div.childNodes).some(v => v[1].innerText == '') || !checkEquation(Object.entries(div.childNodes).map(v => v[1].innerText).join(''))) return '';
    let temp = [];
    div.childNodes.forEach((v, i) => {
      if(v.innerText != theEquation[i]) {
        if(theEquation.split('').some(val => v.innerText == val))
          v.style.backgroundColor = 'yellow';
        else
          v.style.backgroundColor = 'gray';
      } else {
        v.style.backgroundColor = 'green';
        temp.push(v.innerText);
      }
    });
    if(temp.length != theEquation.length) {
      let div = document.createElement('div');
      div.className = 'boxes';
      for(let i = 0; i < theEquation.length; ++i) {
        let p = document.createElement('P');
        p.className = 'charBox';
        div.appendChild(p);
      }
      divMain.appendChild(div);
    }
  }
}