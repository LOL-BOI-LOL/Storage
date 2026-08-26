window.dealer = null;
window.player = null;

Object.assign(Array.prototype, {
  random: function () {
    return this[Math.floor(Math.random() * this.length)];
  },
  pick: function () {
    if (this.length === 0)
      throw new RangeError("Tried to pick from an empty array");

    return this.splice(Math.floor(Math.random() * this.length), 1)[0];
  },
  last: function () {
    return this[this.length - 1];
  },
  first: function () {
    return this[0];
  },
  sgv: function () {
    if (this.length === 1)
      return this[0];

    return this;
  }
});

class Suit {
  static validSuits = ["H", "D", "C", "S"];
  static hearts = new Suit("H");
  static diamonds = new Suit("D");
  static clubs = new Suit("C");
  static spades = new Suit("S");

  constructor(suit) {
    if (typeof (suit) !== "string")
      throw new TypeError("Invalid type provided for a suit");
    else
      suit = suit.toUpperCase();

    if (Suit.validSuits.indexOf(suit) === -1)
      throw new Error("Invalid value given");

    this.hidden = false;
    this.suit = suit;
    this.element = document.createElement("IMG");
    this.element.className = "suit"
    this.element.src = "suits/" + this.name + ".png";

    this.updateDisplay();
  }

  get name() {
    return {
      H: "hearts",
      D: "diamonds",
      C: "clubs",
      S: "spades"
    }[this.suit];
  }

  get unicode() {
    return {
      H: "♥",
      D: "♦",
      C: "♣",
      S: "♠"
    }[this.suit];
  }

  updateDisplay() {
    this.element.style.visibility = (this.hidden ? "hidden" : "visible");
  }

  hide() {
    this.hidden = false;
    this.updateDisplay();
  }

  show() {
    this.hidden = true;
    this.updateDisplay();
  }

  isA(otherSuit) {
    return this.suit === otherSuit.suit;
  }
}

class Face {
  static validFaces = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  constructor(faceValue) {
    if (typeof (faceValue) !== "string")
      throw new TypeError("faceValue must be a string");
    else
      faceValue = faceValue.toUpperCase();

    if (Face.validFaces.indexOf(faceValue) === -1)
      throw new Error("Invalid face value");

    this.hidden = false;
    this.face = faceValue;
    this.element = document.createElement("SPAN");
    this.element.className = "face";

    this.updateDisplay();
  }

  points(sum = 0) {
    let index = Face.validFaces.indexOf(this.face);

    // Ace: 11, but 1 if 11 will bust
    if (index === 0)
      return (sum > 11 ? 1 : 11);

    // Face card
    if (index > 9)
      return 10;

    // Any other card
    return index + 1;
  }

  updateDisplay() {
    this.element.innerText = (this.hidden ? "?" : this.face);
  }

  hide() {
    this.hidden = true;
    this.updateDisplay();
  }

  show() {
    this.hidden = false;
    this.updateDisplay();
  }
}

class Card {
  static drawPile = null;

  constructor(suit, face, deckNumber = 0) {
    if (suit === undefined || face === undefined)
      throw new Error("Must provide a suit and a face");

    if (!(suit instanceof Suit) || !(face instanceof Face))
      throw new TypeError("Invalid types for suit or face");

    this.hidden = false;
    this.suit = suit;
    this.face = face;
    this.deckNumber = deckNumber;
    this.element = document.createElement("DIV");
    this.element.className = "card";
    this.element.appendChild(this.face.element);
    this.element.appendChild(this.suit.element);

    this.updateDisplay();
  }

  points(sum = 0) {
    return this.face.points(sum);
  }

  show() {
    this.hidden = false;
    this.suit.hidden = false;
    this.face.hidden = false;
    this.updateDisplay();
  }

  hide() {
    this.hidden = true;
    this.suit.hidden = true;
    this.face.hidden = true;
    this.updateDisplay();
  }

  updateDisplay() {
    this.element.style.zIndex = -this.deckNumber + "";
    this.element.style.marginLeft = 35 + 40 * this.deckNumber + "px";
    
    this.suit.updateDisplay();
    this.face.updateDisplay();
  }

  static refreshDeck(decks = 1) {
    Card.drawPile = (new Array(decks)).fill().map(() => Face.validFaces.map(f => Suit.validSuits.map(s => new Card(new Suit(s), new Face(f))))).flat().flat();
  }

  static pickCard(n = 1) {
    return (new Array(n)).fill().map(() => Card.drawPile.pick()).sgv();
  }

  static randomCard(n = 1) {
    return (new Array(n)).fill().map(() => new Card(
      new Suit(Suit.validSuits.random()),
      new Face(Face.validFaces.random())
    ));
  }
}

class Deck {
  constructor(numberOfCards = 0) {
    this.deck = [];
    this.element = document.createElement("DIV");

    this.addPicked(numberOfCards);

    this.updateDisplay();
  }

  get sum() {
    let sum = 0;

    this.deck.forEach(card => sum += card.points(sum));

    return sum;
  }

  get status() {
    if (this.sum > 21)
      return -1;
    else if (this.sum < 21)
      return 0;
    else
      return 1;
  }

  addPicked(n = 1) {
    for (let card, i = 0; i < n; ++i) {
      card = Card.pickCard();
      
      card.deckNumber = this.deck.length + 1;
      card.updateDisplay();

      this.deck.push(card);
    }

    this.updateDisplay();
  }

  addCard(card) {
    if (!(card instanceof Card))
      throw new TypeError("Card must be a Card");
    
    card.deckNumber = this.deck.length + 1;
    card.updateDisplay();

    this.deck.push(card);

    this.updateDisplay();
  }

  clearDeck() {
    this.deck = [];
  }

  updateDisplay() {
    let fc;

    while ((fc = this.element.firstChild))
      this.element.removeChild(fc);

    this.deck.forEach(card => {
      this.element.appendChild(card.element);
      card.updateDisplay();
    });
  }
}

function resetGame() {
  Card.refreshDeck();

  if (window.dealer === null) {
    window.dealer = new Deck(2);
  } else {
    window.dealer.clearDeck();
    window.dealer.addPicked(2);
  }

  if (window.player === null) {
    window.player = new Deck(2);
  } else {
    window.player.clearDeck();
    window.player.addPicked(2);
  }

  console.log(dealer.deck, player.deck)

  // window.dealer.deck.last().hide();
}

window.onload = () => {
  resetGame();

  dealer.element.id = "dealer";
  player.element.id = "player";

  ["dealer", "player"].forEach(v => document.body.querySelector("#" + v).innerHTML = window[v].element.innerHTML);
}