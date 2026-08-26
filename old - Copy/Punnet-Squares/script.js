const ids = {
  btnCalc: document.getElementById('btnCalc'),
  p1: {
    A1: document.getElementById('A1'),
    A2: document.getElementById('B1'),
    B1: document.getElementById('C1'),
    B2: document.getElementById('D1'),
    C1: document.getElementById('E1'),
    C2: document.getElementById('F1')
  },
  p2: {
    A1: document.getElementById('A2'),
    A2: document.getElementById('B2'),
    B1: document.getElementById('C2'),
    B2: document.getElementById('D2'),
    C1: document.getElementById('E2'),
    C2: document.getElementById('F2')
  }
}

const calc = () => {
  let temp = 3;
  if(B1.value == '')
    temp = 1;
  else if(C1.value == '')
    temp = 2;
  for(let i = 0; i < temp; i++) {
    let letter = ['A', 'B', 'C'][i];
    let alleles = [ids.p1[letter+1].value, ids.p1[letter+2].value, ids.p2[letter+1].value, ids.p2[letter+2].value];
    
  }  
}