const hand = document.getElementById('hand')
const dealer = document.getElementById('dealer');
const btnng = document.getElementById('btnNewGame');
const btndraw = document.getElementById('btnDraw');
const btnstay = document.getElementById('btnStay');
card = undefined;
gamestate = false;
playerturn = false;
btnng.addEventListener('mousedown', newgame);
btndraw.addEventListener('mousedown', draw);
btnstay.addEventListener('mousedown', stay);
function defineDeck() {
  deck = ['AD','2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD','AH','2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AS','2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AC','2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC'];
  curhand = [];
  dealerhand = [];
}
function shuffle() {
  tempdeck = [];
  for(i = 0; i < 52; i++) {
    rand = Math.floor(Math.random() * deck.length);
    tempdeck.push(deck[rand]);
    deck.splice(rand, 1);
  }
  deck = tempdeck;
  dealerhand.push(deck[0]+'H');
  deck.splice(0, 1);
  dealerhand.push(deck[0]);
  deck.splice(0, 1);
}
function loadhand() {
  for(i = 0; i < curhand.length; i++) {
    curnum = curhand[i].split("").shift();
    cursym = curhand[i].split("").pop();
    if(cursym == 'D') {
      cursym = 'symbols/diamonds.png';
    }else if(cursym == 'H') {
      cursym = 'symbols/hearts.png';
    }else if(cursym == 'C') {
      cursym = 'symbols/clubs.png';
    }else {
      cursym = 'symbols/spades.png';
    }
    div = document.createElement('div');
    div.className = 'card';
    div.style.zIndex = String(-i);
    div.style.marginLeft = String(i*7)+'vw';
    img = document.createElement('img');
    img.className = 'symbol';
    img.src = cursym;
    num = document.createElement('p');
    num.className = 'value';
    num.innerHTML = curnum;
    div.appendChild(num);
    div.appendChild(img);
    hand.appendChild(div);
    div.addEventListener('mouseenter', focus);
    div.addEventListener('mouseleave', unfocus);
  }
  hand.style.marginLeft = String((100 - ((curhand.length - 1) * 7 + 15)) / 2) + 'vw';
}
function loaddhand() {
  if(dealerhand.length > 0) {
    if(dealerhand[0].split("")[2] == 'H') {
      div = document.createElement('div');
      div.className = 'card';
      div.style.zIndex = '0';
      div.style.marginLeft = '0vw';
      num = document.createElement('p');
      num.className = 'value';
      num.innerHTML = '?';
      div.appendChild(num);
    } else {
      curnum = dealerhand[0].split("").shift();
      cursym = dealerhand[0].split("")[1];
      console.log(cursym);
      if(cursym == 'D') {
        cursym = 'symbols/diamonds.png';
      }else if(cursym == 'H') {
        cursym = 'symbols/hearts.png';
      }else if(cursym == 'C') {
        cursym = 'symbols/clubs.png';
      }else {
        cursym = 'symbols/spades.png';
      }
      div = document.createElement('div');
      div.className = 'card';
      div.style.zIndex = 0;
      div.style.marginLeft = '0vw';
      img = document.createElement('img');
      img.className = 'symbol';
      img.src = cursym;
      num = document.createElement('p');
      num.className = 'value';
      num.innerHTML = curnum;
      div.appendChild(num);
      div.appendChild(img);
    }
    dealer.appendChild(div);
    div.addEventListener('mouseenter', focus);
    div.addEventListener('mouseleave', unfocus);
    for(i = 1; i < dealerhand.length; i++) {
      curnum = dealerhand[i].split("").shift();
      cursym = dealerhand[i].split("").pop();
      if(cursym == 'D') {
        cursym = 'symbols/diamonds.png';
      }else if(cursym == 'H') {
        cursym = 'symbols/hearts.png';
      }else if(cursym == 'C') {
        cursym = 'symbols/clubs.png';
      }else {
        cursym = 'symbols/spades.png';
      }
      div = document.createElement('div');
      div.className = 'card';
      div.style.zIndex = String(-i);
      div.style.marginLeft = String(i*7)+'vw';
      img = document.createElement('img');
      img.className = 'symbol';
      img.src = cursym;
      num = document.createElement('p');
      num.className = 'value';
      num.innerHTML = curnum;
      div.appendChild(num);
      div.appendChild(img);
      dealer.appendChild(div);
      div.addEventListener('mouseenter', focus);
      div.addEventListener('mouseleave', unfocus);
    }
    dealer.style.marginLeft = String((100 - ((curhand.length - 1) * 7 + 15)) / 2) + 'vw';
  }
}
function clearhand() {
  cards = hand.getElementsByClassName('card');
  len = cards.length;
  for(i = 0; i < len; i++) {
    cards[0].remove();
  }
}
function cleardhand() {
  cards = dealer.getElementsByClassName('card');
  len = cards.length;
  for(i = 0; i < len; i++) {
    cards[0].remove();
  }
}
function ddraw() {
  dealerhand.push(deck[0]);
  deck.splice(0, 1);
  cleardhand();
  loaddhand();
}
function draw() {
  console.log('Card Drawn');
  if(gamestate) {
    console.log('Game Active');
    curhand.push(deck[0]);
    deck.splice(0, 1);
    clearhand();
    loadhand();
  }
}
function stay() {
  console.log('Stayed');
  if(gamestate) {
    sum = 0;
    aces = 0;
    dealerhand[0] = dealerhand[0].split("H")[0] + 'S';
    for(i = 0; i < dealerhand.length; i++) {
      curval = dealerhand[i].split("")[0];
      if(curval == 'A') {
        curval = 0;
        aces++; 
      } else if(curval == 'K' || curval == 'Q' || curval == 'J') {
        curval = 10;
      } else {
        curval = parseInt(curval);
      }
      sum += curval;
    }
    for(i = 0; i < aces; i++) {
      sum += 11;
      if(sum > 21){
        sum -= 10;
      }
    }
    if(sum < 17) {
      ddraw();
      stay();
    } else {
      cleardhand();
      loaddhand();
    }
    console.log(sum);
  }
}
function newgame() {
  console.log('New Game');
  clearhand();
  cleardhand();
  defineDeck();
  shuffle();
  loaddhand();
  gamestate = true;
}
function focus() {
  card = document.querySelectorAll( ":hover" )[3];
  card.style.paddingTop = '0vw';
  if(card.childNodes[1] != undefined) {
    card.childNodes[1].style.top = '1vw';
  }
}
function unfocus() {
  card.style.paddingTop = '15vw';
  if(card.childNodes[1] != undefined) {
    card.childNodes[1].style.top = '16vw';
  }
}
newgame();