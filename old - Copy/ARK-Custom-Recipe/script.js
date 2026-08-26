class Ingredient {
  constructor(health, stamina, food, water, weight) {
    this.health = health;
    this.stamina = stamina;
    this.food = food;
    this.water = water;
    this.weight = weight;
    if(Object.entries(this).some(v => typeof v[1] == 'undefined')) throw new TypeError('An argument is undefined');
  }
}

const table = document.getElementsByTagName('table')[0];
const tableBody = document.getElementsByTagName('tbody')[0];
const tableH = document.getElementsByTagName('th')[4];
const selects = document.getElementsByTagName('select');
const input = document.getElementsByTagName('input')[0];
const btn = document.getElementsByTagName('button')[0];
const ingredients = {
  kibble: new Ingredient(0.01, 3, 2.25, -1, 0.05),
  egg: new Ingredient(0.8, 0.8, 0.8, 0.01, 0.3),
  meat1: new Ingredient(0.33, 0.01, 0.29, 0.01, 0.02),
  honey: new Ingredient(0.11, 0.01, 0.2, 0.01, 0.02),
  rawmeat1: new Ingredient(0.24, 0.01, 0.2, 0.01, 0.02),
  meat2: new Ingredient(0.11, 0.01, 0.2, 0.01, 0.02),
  rawmeat2: new Ingredient(0.11, 0.01, 0.15, 0.01, 0.02),
  element: new Ingredient(0.1, 0.1, 0.1, 0.1, 0.01),
  narco: new Ingredient(0.01, -0.1, 0.1, 0.01, 0.01),
  mushroom1: new Ingredient(0.05, 0.2, 0.1, 0, 0.1),
  mushroom2: new Ingredient(0.01, -0.1, 0.1, 0.01, 0.02),
  cake: new Ingredient(0.1, 0.01, 0.1, 0.01, 0.02),
  soap: new Ingredient(-0.05, -0.05, 0.1, -0.05, 0.01),
  nodule: new Ingredient(-0.5, -0.5, 0.1, -0.5, 0.01),
  polymer: new Ingredient(-0.5, -0.5, 0.1, -0.5, 0.01),
  feces1: new Ingredient(-0.125, -0.125, 0.1, -0.125, 0.01),
  feces2: new Ingredient(-0.1, -0.1, 0.1, -0.1, 0.01),
  feces3: new Ingredient(-0.15, -0.15, 0.1, -0.15, 0.01),
  spoiled: new Ingredient(-0.5, -0.3, 0.0625, 0.01, 0.02),
  crops: new Ingredient(0.055, 0.01, 0.06, 0.5, 0.02),
  mejo: new Ingredient(0.01, 0.01, 0.0525, 0.035, 0.01),
  mushroom3: new Ingredient(0.01, 0.1, 0.05, 0.2, 0.01),
  berries: new Ingredient(0.01, 0.01, 0.0375, 0.025, 0.01),
  stim: new Ingredient(0.01, 0.125, 0.0375, -0.25, 0.01),
  mushroom4: new Ingredient(0.01, 0.5, 0.0375, -0.25, 0.01),
  mushroom5: new Ingredient(0.01, 1, 0.01, 0.01, 0.01),
  seeds: new Ingredient(0.01, 0.01, 0.01, 0.01, 0.01),
  flower: new Ingredient(0.01, 0.01, 0.01, 0.01, 1),
  feces4: new Ingredient(-0.05, -0.05, 0, -0.05, 0.01),
  feces5: new Ingredient(-0.05, -0.05, 0, -0.05, 0.01)
};

function calc(ingredient, skill, type, amount) {
  if((type == 'food' && ingredient.food <= 0) || (type == 'drink' && ingredient.water <= 0)) return null;
  let num = Math.ceil((amount - 1) / (skill / 100 * 1.5625 - 0.3125) / 5 / (type == 'food' ? ingredient.food : ingredient.water));
  let calc2 = stat => parseFloat((1 + (skill / 100 * 1.5625 - 0.3125) * (5 * ingredient[stat] * num)).toFixed(4));
  return [num, calc2('health'), calc2('stamina'), calc2(type == 'food' ? 'food' : 'water'), parseFloat((0.1 + 0.2 * ingredient.weight * num).toFixed(4))];
}

function addRow(items) {
  let tr = document.createElement('tr');
  items.forEach(v => {
    let td = document.createElement('td');
    td.innerText = v;
    tr.appendChild(td);
  });
  tableBody.appendChild(tr);
}

function createTable() {
  while(tableBody.firstChild)
    tableBody.removeChild(tableBody.firstChild);
  let ingredient = selects[0].value;
  let type = selects[1].value;
  let amount = input.value;
  for(let i = 10; i <= 189; ++i) {
    let result = calc(ingredients[ingredient], i * 10, type, amount);
    result.unshift(i * 10 + '%');
    addRow(result);
  }
  if(type == 'food') tableH.innerText = 'Food';
  else tableH.innerText = 'Water';
  table.style.visibility = 'visible';
}

btn.onclick = createTable;