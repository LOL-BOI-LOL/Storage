function calc(str, array = str.split(' ')) {
  while(array.length > 1) {
    for(let i = 0; i < array.length; ++i) {
      if(isNaN(+array[i])) {
        array.splice(i - 2, 3, arithmetic(...array.slice(i - 2, i + 1)));
        break;
      }
    }
  } 
  return +array;
}

function arithmetic(num1, num2, operator) {
  if(['+', '-', '/', '*', '**', '%'].indexOf(operator) != -1)
    return eval(num1 + operator + num2);
  else if(operator == '^')
    return (+num1) ** (+num2);
  else if(operator == 'mod')
    return (+num1) % (+num2);
}