const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randArray = (len, range) => {
  let a = [];
  for(let i = 0; i < len; i++) {
      a.push(randInt(...range));
  }
  return a;
}

const check = array => !(array.some((v, i) => array[Math.max(i - 1, 0)] > v));

function quick(array) {
    if(array.length > 1) {
        let less = [];
        let greater = [];
        array.slice(0, -1).forEach(v => {
            if(v <= array[array.length - 1])
                less.push(v);
            else
                greater.push(v);
        });
        let tempa = [];
        if(less.length > 0)
            tempa = tempa.concat(quick(less));
        tempa.push(array[array.length - 1]);
        if(greater.length > 0)
            tempa = tempa.concat(quick(greater));
        return tempa;
    } else {
        return array;
    }
}

function dumbSort(array, time) {
  if(Array.isArray(array) && array.length > 1 && !check(array)) {
    let tempArrays = [];
    let counter = 0;
    let tempB;
    let done = 0;
    while(!done) {
      counter++;
      let tempA = array.slice();
      tempB = [];
      while(tempA.length)
        tempB = tempB.concat(tempA.splice(randInt(0, tempA.length - 1), 1));
      tempArrays.push(tempB);
      if(check(tempB))
        done = 1;
    }
    tempArrays.forEach((v, i) => {
      setTimeout(() => drawGraph(v), time * i);
    });
    return {
      looped: counter,
      timeTillDoneDrawing: time/1000 * tempArrays.length,
      result: tempB
    };
  } else {
    return array;
  }
}

var interval = null;

function dumbSort2(array, time) {
  let counter = 0;
  interval = setInterval(() => {
    counter++;
    let tempA = array.slice();
    let tempB = [];
    while(tempA.length)
      tempB = tempB.concat(tempA.splice(randInt(0, tempA.length - 1), 1));
    drawGraph(tempB);
    if(check(tempB))
      dumbSort3(counter);
  }, time);
}

function dumbSort3(count) {
  clearInterval(interval);
  interval = null;
  console.log(count);
}

function bubbly(array, time) {
  let tempArrays = [];
  let tempArray = array.slice();
  while(!check(tempArray)) {
    tempArray.forEach((v, i) => {
      if(i != 0) {
        if(v < tempArray[i - 1]) {
          tempArray[i] = tempArray[i - 1];
          tempArray[i - 1] = v;
          tempArrays.push(tempArray.slice());
        }
      }
    });
  }
  tempArrays.forEach((v, i) => {
    setTimeout(() => drawGraph(v), time*i)
  });
  return tempArray;
}

function merge(array) {
  if(array.length > 1) {
    let lower = [];
    let higher = [];
    array.forEach((v, i) => {
      if(i < Math.floor(array.length/2))
        lower.push(v);
      else
        higher.push(v);
    });
    let tempArray = []; 
    if(lower.length)
      tempArray = tempArray.concat(merge(lower));
    if(higher.length)
      tempArray = tempArray.concat(merge(higher));
    return bubbly(tempArray);
  } else {
    return array;
  }
}

var tempArrays = [];

function getGnomed(array, time) {
  tempArrays = [];
  let tempArray = array.slice();
  tempArray.forEach((v, i) => {
    if(i != 0)
      tempArray = checkThenSwitch(tempArray, i);
  });
  tempArrays.forEach((v, i) => {
    setTimeout(() => drawGraph(v), time * i);
  });
  return tempArray;
}

function checkThenSwitch(array, i) {
  let tempArray = array.slice();
  if(array[i] < array[i - 1]) {
    tempArray[i] = array[i - 1];
    tempArray[i - 1] = array[i];
    tempArrays.push(tempArray);
    if(i - 1 != 0)
      tempArray = checkThenSwitch(tempArray, i - 1);
  }
  return tempArray;
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sizeCanvas = () => {
  if(window.innerWidth <= window.innerHeight)
    canvas.width = window.innerWidth,
    canvas.height = window.innerWidth;
  else
    canvas.width = window.innerHeight,
    canvas.height = window.innerHeight;  
  clearCanvas();
}

const clearCanvas = (x = 0, w = canvas.width) => {
  ctx.strokeStyle = 'none';
  ctx.fillStyle = 'black';
  ctx.fillRect(x, 0, w, canvas.height);
}

document.body.onload = sizeCanvas;
window.onresize = sizeCanvas;

var lastArrayDrawn = '';

function drawGraph(array) { 
  let offset = -(Math.min(...array));
  let factor = (canvas.height*0.8)/Math.abs(Math.max(...array) + offset);
  clearCanvas(); 
  ctx.fillStyle = 'blue';
  ctx.lineWidth = 0;
  array.forEach((v, i) => {
    ctx.fillRect(
      canvas.width/array.length * i,
      canvas.height,
      canvas.width/array.length,
      -(canvas.height * 0.1 + (v + offset) * factor)
    );  
  });
}

function unknown(array, time) {
  let tempA = array.slice();
  let tempB = [];
  let tempArrays = [];
  while(tempA.length) {
    let tempC = [Math.min(...tempA)];
    tempC.push(tempA.indexOf(tempC[0]));
    tempA.splice(tempC[1], 1);
    tempB.push(tempC[0]);
    tempArrays.push(tempB.slice());
  }
  tempArrays.forEach((v, i) => {
    setTimeout(() => drawGraph(v), i * time);
  });
  return tempB;
}

function cocktailSort(array, time) {
  let tempArrays = [];
  let tempArray = array.slice();
  while(!check(tempArray)) {
    tempArray.forEach((v, i) => {
      if(i != 0) {
        if(v < tempArray[i - 1]) {
          tempArray[i] = tempArray[i - 1];
          tempArray[i - 1] = v;
          tempArrays.push(tempArray.slice());
        }
      }
    });
    tempArray.reverse();
    tempArray.forEach((v, i) => {
      if(i != 0) {
        if(v > tempArray[i - 1]) {
          tempArray[i] = tempArray[i - 1];
          tempArray[i - 1] = v;
          tempArray.reverse();
          tempArrays.push(tempArray.slice());
          tempArray.reverse();
        }
      }
    });
    tempArray.reverse();
  }
  tempArrays.forEach((v, i) => {
    setTimeout(() => drawGraph(v), time*i)
  });
  return tempArray;
}