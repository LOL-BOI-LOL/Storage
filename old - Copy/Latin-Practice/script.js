const input = document.getElementById('item');
const btnAdd = document.getElementById('btnAdd');
const btnSub = document.getElementById('btnSub');
const btnChck = document.getElementById('btnChck');
const btnClr = document.getElementById('btnClr');
const table = document.getElementById('table');
const select = document.getElementById('type');

const key = [
  ['a, ae', 'us/r, I', 'um, a', '-, Es', '-, a', '-, es', '-, ia'],//, 'us, Us', 'U, ua', 'Es, Es'],
  ['ae, Arum', 'I, Orum', 'I, Orum', 'is, um', 'is, um', 'is, ium', 'is, ium'],//, 'Us, uum', 'Us, um', 'eI, Erum'],
  ['ae, Is', 'O, Is', 'O, Is', 'I, ibus', 'I, ibus', 'I, ibus', 'I, ibus'],//, 'uI, ibus', 'U, ibus', 'eI, Ebus'],
  ['am, As', 'um, Os', 'um, a', 'em, Es', '-, a', 'em, Es', '-, ia'],//, 'um, Us', 'U, ua', 'em, Es'],
  ['A, Is', 'O, Is', 'O, Is', 'e, ibus', 'e, ibus', 'e, ibus', 'I, ibus'],//, 'U, ibus', 'U, ibus', 'E, Ebus']
];
const tables = [
  [
    ['Cases', '1st', '2nd', '2nd Neuter', '3rd'],
    ['Nominative', ]
  ]
];

const add = () => {
  let cell;
  for(let row = 1; row < table.rows.length; row++) {
    for(let column = 1; column < table.rows[row].cells.length; column++) {
      if(table.rows[row].cells[column].innerText == '') {
        cell = table.rows[row].cells[column];
        break;
      }
    }
    if(cell) break;
  }
  if(cell && input.value) cell.innerText = input.value;
  input.value = '';
}

const sub = () => {
  let cell;
  for(let row = table.rows.length - 1; row > 0; --row) {
    for(let column = table.rows[row].cells.length - 1; column > 0; --column) {
      if(table.rows[row].cells[column].innerText != '') {
        cell = table.rows[row].cells[column];
        break;
      }
    }
    if(cell) break;
  }
  if(cell) cell.innerText = '';
}

const check = () => {
  let cell = false;
  for(let row = table.rows.length - 1; row > 0; --row) {
    for(let column = table.rows[row].cells.length - 1; column > 0; --column) {
      if(table.rows[row].cells[column].innerText.toLowerCase() != key[row-1][column-1].toLowerCase()) {
        cell = true;
        break;
      }
    }
    if(cell) break;
  }
  if(cell) return false;
  return true;
}

btnAdd.onclick = () => add();
btnSub.onclick = () => sub();
btnClr.onclick = () => {
  for(let i = 0; i < 20; i++)
    sub();
};
btnChck.onclick = () => input.value = check();
document.onkeydown = () => {
  if(event.key == 'Enter')
    add();
  else if(event.key == 'Escape')
    sub();
  else if(event.key == 'Alt')
    input.value = check();
}
select.onchange = () => {
  
}