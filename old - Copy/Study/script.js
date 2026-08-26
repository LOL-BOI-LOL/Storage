class Element {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
  }
}

const td = {
  question: document.getElementById('question'),
  answer1: document.getElementById('answer1'),
  answer2: document.getElementById('answer2'),
  answer3: document.getElementById('answer3'),
  answer4: document.getElementById('answer4')
};
const sel2 = document.getElementById('setSel');
const result = document.getElementById('txt');
const names0 = ['Aluminum', 'Antimony', 'Argon', 'Arsenic', 'Barium', 'Beryllium', 'Bismuth', 'Boron', 'Bromine', 'Cadmium', 'Calcium', 'Carbon', 'Cesium/Caesium', 'Chlorine', 'Chromium', 'Cobalt', 'Copper', 'Fluorine', 'Francium', 'Gold', 'Helium', 'Hydrogen', 'Iodine', 'Iron', 'Krypton', 'Lead', 'Lithium', 'Magnesium', 'Manganese', 'Mercury', 'Neon', 'Nickel', 'Nitrogen', 'Oxygen', 'Phosphorus', 'Platinum', 'Potassium', 'Radium', 'Radon', 'Silicon', 'Silver', 'Sodium', 'Strontium', 'Sulfur', 'Tin', 'Titanium', 'Tungsten', 'Uranium', 'Xenon', 'Zinc'];
const symbol0 = ['Al', 'Sb', 'Ar', 'As', 'Ba', 'Be', 'Bi', 'B', 'Br', 'Cd', 'Ca', 'C', 'Cs', 'Cl', 'Cr', 'Co', 'Cu', 'F', 'Fr', 'Au', 'He', 'H', 'I', 'Fe', 'Kr', 'Pb', 'Li', 'Mg', 'Mn', 'Hg', 'Ne', 'Ni', 'N', 'O', 'P', 'Pt', 'K', 'Ra', 'Rn', 'Si', 'Ag', 'Na', 'Sr', 'S', 'Sn', 'Ti', 'W', 'U', 'Xe', 'Zn'];
const names1 = ['Hydrogen ion', 'Lithium ion', 'Sodium ion', 'Potassium ion', 'Cesium ion', 'Silver ion', 'Beryllium ion', 'Magnesium ion', 'Calcium ion', 'Barium ion', 'Nickel ion', 'Zinc ion', 'Boron ion', 'Aluminum ion', 'Gallium ion', 'Gold ion', 'Hydride', 'Fluoride', 'Chloride', 'Bromide', 'Iodide', 'Oxide', 'Sulfide', 'Nitride', 'Phosphide'];
const symbol1 = ['H+', 'Li+', 'Na+', 'K+', 'Cs+', 'Ag+', 'Be+2', 'Mg+2', 'Ca+2', 'Ba+2', 'Ni+2', 'Zn+2', 'B+3', 'Al+3', 'Ga+3', 'Au+3', 'H-', 'F-', 'Cl-', 'Br-', 'I-', 'O-2', 'S-2', 'N-3', 'P-3'];
const names2 = ['Copper I', 'Copper II', 'Mercury I', 'Mercury II', 'Iron II', 'Iron III', 'Cobalt II', 'Cobalt III', 'Chromium II', 'Chromium III', 'Tin II', 'Tin IV', 'Lead II', 'Lead IV'];
const symbol2 = ['Cu+', 'Cu+2', 'Hg2+2', 'Hg+2', 'Fe+2', 'Fe+3', 'Co+2', 'Co+3', 'Cr+2', 'Cr+3', 'Sn+2', 'Sn+4', 'Pb+2', 'Pb+4'];
const names3 = ['Ammonium ion', 'Acetate', 'Cyanide', 'Hydroxide', 'Permanganate', 'Hypochlorite', 'Chlorite', 'Chlorate', 'Perchlorate', 'Nitrite', 'Nitrate', 'Bromite', 'Bromate', 'Hydrogen Carbonate', 'Hydrogen Sulfate', 'Iodate', 'Carbonate', 'Peroxide', 'Sulfite', 'Sulfate', 'Chromate', 'Dichromate', 'Oxalate', 'Hydrogen Phosphate', 'Phosphate'];
const symbol3 = ['NH4+', 'C2H3O2-', 'CN-', 'OH-', 'MnO4-', 'ClO-', 'ClO2-', 'ClO3-', 'ClO4-', 'NO2-', 'NO3-', 'BrO2-', 'BrO3-', 'HCO3-', 'HSO4-', 'IO3-', 'CO3-2', 'O2-2', 'SO3-2', 'SO4-2', 'CrO4-2', 'Cr2O7-2', 'C2O4-2', 'HPO4-2', 'PO4-3'];
const names4 = ['head', 'body', 'river', 'journey, route', 'name', 'time', 'wound', 'speed', 'victor, winner', 'sound, healthy', 'press, push', 'steal, snatch', 'between, among, amongst'];
const symbol4 = ['caput, capitis - n', 'corpus, corporis - n', 'flumen, fluminis - n', 'iter, itineris - n', 'nomen, nominis - n', 'tempus, temporis - n', 'vulnus, vulneris - n', 'celeritas, celeritatis - f', 'victor, victoris - m', 'sanus, sana, sanum', 'premo, premere, pressi, pressus', 'rapio, rapere, rapui, raptus', 'inter + acc'];
const names5 = ['sea', 'city', 'night', 'death', 'part, share', 'art, skill', 'citizen', 'enemy', 'ship', 'brave', 'sad, gloomy', 'short', 'heavy, serious', 'terrible', 'huge', 'lucky', 'every, all'];
const symbol5 = ['mare, maris, marium - n', 'urbs, urbis, urbium - f', 'nox, noctis, noctium - f', 'mors, mortis, mortium - f', 'pars, partis, partium - f', 'ars, artis, artium - f', 'civis, civis, civium - m & f', 'hostis, hostis, hostium - m', 'navis, navis, navium - f', 'fortis, forte', 'tristis, triste', 'brevis, breve', 'gravis, grave', 'terribilis, terribile', 'ingens, ingentis', 'felix, felicis', 'omnis, omne'];
const names6 = ['shout, loud noise', 'heart', 'right, law', 'chest, heart', 'no, none', 'any', 'throw', 'complete, finish', 'be able', 'before, in front of', 'on account of, because of'];
const symbol6 = ['clamor, clamoris - m', 'cor, cordis - n', 'iur, iuris - n', 'pectus, pectoris - n', 'nullus, nulla, nullum', 'ullus, ulla, ullum', 'iacio, iacere, ieci, iactus', 'perficio, perficere, perfeci, perfectus', 'possum, posse, potui', 'ante - acc', 'ob - acc'];
const names7 = ['Silicon', 'Scandium', 'Vanadium', 'Gallium', 'Germanium', 'Selenium', 'Rubidium', 'Cadmium', 'Indium', 'Platinum', 'Thallium'];
const symbol7 = ['Si', 'Sc', 'V', 'Ga', 'Ge', 'Se', 'Rb', 'Cd', 'In', 'Pt', 'Tl'];
const names = names0.slice().concat(names1, names2);
const symbol = symbol0.slice().concat(symbol1, symbol2);
const elements = names.map((v, i) => new Element(v, symbol[i]));
const start = () => {
  curElements = elements.slice();
  result.innerText = '';
  qGen();
};
const qGen = () => {
  let ele = curElements[Math.floor(Math.random() * curElements.length)];
  curElements.splice(curElements.indexOf(ele), 1);
  console.log(curElements.length);
  let q = Math.floor(Math.random()*2) ? 'name' : 'symbol';
  let qNot = q == 'name' ? 'symbol' : 'name';
  td.question.innerText = ele[q];
  let ans = [];
  let nam = names.slice();
  let sym = symbol.slice();
  nam.splice(nam.indexOf(ele.name), 1);
  sym.splice(sym.indexOf(ele.symbol), 1);
  let iA = Math.floor(Math.random()*4);
  for(let i = 0; i < 4; ++i) {
    if(i != iA) {
      if(qNot == 'name') {
        let curNam = nam[Math.floor(Math.random()*nam.length)];
        ans.push(curNam);
        nam.splice(nam.indexOf(curNam), 1);
      } else {
        let curSym = sym[Math.floor(Math.random()*sym.length)];
        ans.push(curSym);
        sym.splice(sym.indexOf(curSym), 1);
      }
    } else {
      ans.push(ele[qNot]);
    }
  }
  ans.forEach((v, i) => {
    td['answer' + (i + 1)].innerText = v;
    if(v == ele[qNot])
      td['answer' + (i + 1)].onclick = cor;
    else
      td['answer' + (i + 1)].onclick = inc;
  });
};
const cor = () => {
  if(curElements.length) {
    reset();
    qGen();
    result.innerText = 'Correct';
  } else {
    reset();
    result.innerText = 'Done';
  }
}
const inc = () => {
  reset();
  result.innerText = 'Wrong, Restart';
};
const reset = () => {
  td.question.innerText = '';
  td.answer1.innerText = '';
  td.answer2.innerText = '';
  td.answer3.innerText = '';
  td.answer4.innerText = '';
  td.answer1.onclick = '';
  td.answer2.onclick = '';
  td.answer3.onclick = '';
  td.answer4.onclick = '';
};

var curElements;

document.getElementById('start').onclick = start;

const strt2 = document.getElementById('start2');
const input = document.getElementById('input');
const q2 = document.getElementById('q');
const res2 = document.getElementById('res');
const select = document.getElementById('sel');

const start2 = () => {
  if(sel2.value == 'all')
    curElements2 = elements.slice();
  else if(sel2.value == 'ele')
    curElements2 = names0.map((v, i) => new Element(v, symbol0[i]));
  else if(sel2.value == 'ions')
    curElements2 = names1.slice().concat(names2, names3).map((v, i) => new Element(v, symbol1.slice().concat(symbol2, symbol3)[i]));
  else if(sel2.value == 'mono')
    curElements2 = names1.map((v, i) => new Element(v, symbol1[i]));
  else if(sel2.value == 'multi')
    curElements2 = names2.map((v, i) => new Element(v, symbol2[i]));
  else if(sel2.value == 'poly')
    curElements2 = names3.map((v, i) => new Element(v, symbol3[i]));
  else if(sel2.value == 'latin1')
    curElements2 = names4.map((v, i) => new Element(v, symbol4[i]));
  else if(sel2.value == 'latin2')
    curElements2 = names5.map((v, i) => new Element(v, symbol5[i]));
  else if(sel2.value == 'latin3')
    curElements2 = names6.map((v, i) => new Element(v, symbol6[i]));
  else if(sel2.value == 'upele')
    curElements2 = names7.map((v, i) => new Element(v, symbol7[i]));
  numC = 0;
  numIC = 0;
  wrongCount = [0, null, null];
  res2.innerText = '';
  qGen2();
};
const qGen2 = () => {
  let ele;
  if(wrongCount[0])
    ele = wrongCount[1];
  else
    ele = curElements2[Math.floor(Math.random() * curElements2.length)];
  curQ = ele;
  if(select.value == 'sym')
    type2 = 'symbol';
  else if(select.value == 'nam')
    type2 = 'name';
  else if(wrongCount[0])
    type2 = wrongCount[2];
  else
    type2 = Math.floor(Math.random() * 2) ? 'name' : 'symbol';
  curQ2 = ele[type2];
  ans = ele[type2 == 'name' ? 'symbol' : 'name'];
  q2.innerText = ele[type2];
};
input.onkeydown = () => {
  if(event.key == 'Enter') {
    console.log('Question: ' + curQ2, '\nYour Ans: ' + input.value, '\nAns: ' + ans, '\nValidity: ' + (input.value == ans ? 'Correct' : 'Incorrect'), '\nAmount Left: ' + (curElements2.length - (input.value == ans ? 1 : 0)));
    if(input.value == ans) {
      res2.innerText = 'Correct';
      if(!wrongCount[0]) {
        curElements2.splice(curElements2.indexOf(curQ), 1);
        numC++;
      }
      if(wrongCount[0])
        wrongCount[0]--;
    } else {
      res2.innerText = 'Wrong';
      if(!wrongCount[0]) {
        numIC++;
        wrongCount = [2, curQ, type2];
      }
    }
    input.value = '';
    if(curElements2.length)
      qGen2();
    else {
      q2.innerText = 'Done';
      console.log('Correct: ' + numC, '\nIncorrect: ' + numIC, '\nGrade: ' + Math.round(100 * numC / (numC + numIC)) + '%');
    }
  }
};
strt2.onclick = start2;
var curElements2;
var ele;
var ans;
var curQ;
var curQ2;
var numC;
var numIC;
var wrongCount = [0, null];
var type2;