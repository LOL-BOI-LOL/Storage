document.body.onload = () => {
  const inputMV = document.getElementById('msgV'),
        inputKV = document.getElementById('keyV'),
        btnEV = document.getElementById('encryptV'),
        btnDV = document.getElementById('decryptV'),
        inputMC = document.getElementById('msgC'),
        inputOC = document.getElementById('offsetC'),
        paraVC = document.getElementById('offsetVC'),
        btnEC = document.getElementById('encryptC'),
        btnDC = document.getElementById('decryptC'),
        encryptV = (str, key) => {
          if(str == '' || key == '')
            throw new Error('One or both of the inputs are empty strings at encrypt function.');
          if(typeof str != 'string' || typeof key != 'string')
            throw new Error('One or both inputs are not strings at encrypt function.');
          str = str.toUpperCase();
          key = key.toUpperCase();
          if(key.split('').some(v => array.indexOf(v) == -1))
            throw new Error('Invalid key at encrypt function.');
          return str.split('').map((v, i) => {
            if(array.indexOf(v) > 0)
              return array[(array.indexOf(v) + array.indexOf(key[i % key.length])) % array.length];
            return v;
          }).join('');
        },
        decryptV = (str, key) => {
          if(str == '' || key == '')
            throw new Error('One or both of the inputs are empty strings at decrypt function.');
          if(typeof str != 'string' || typeof key != 'string')
            throw new Error('One or both inputs are not strings at decrypt function.');
          str = str.toUpperCase();
          key = key.toUpperCase();
          if(key.split('').some(v => array.indexOf(v) == -1))
            throw new Error('Invalid key at decrypt function.');
          return str.split('').map((v, i) => {
            if(array.indexOf(v) > 0) {
              let temp = array.indexOf(v) - array.indexOf(key[i % key.length]);
              while(temp < 0)
                temp += array.length;
              return array[temp];
            }
            return v;
          }).join('');
        },
        encryptC = (str, offset) => {
          str = str.toUpperCase();
          str = str.split('').map(v => {
            while(array.indexOf(v) + offset >= array.length)
              return array[0]
              .join('');
          });
        },
        decryptC = (str, offset) => {
          
        };
  
  var array = [];
  
  for(let i = 0; i < 26; ++i)
    array.push(String.fromCharCode(i + 65));
  
  inputOC.value = 0;
  paraVC.innerText = inputOC.value;
  
  btnEV.onclick = () => {
    inputMV.value = encryptV(inputMV.value, inputKV.value);
  };
  
  btnDV.onclick = () => {
    inputMV.value = decryptV(inputMV.value, inputKV.value);
  };
  
  inputOC.oninput = () => {
    paraVC.innerText = inputOC.value;
  };
}