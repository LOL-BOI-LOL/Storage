import java.util.*;
import java.lang.Math;

class Main {
  static Scanner scan = new Scanner(System.in);
  
  public static void main(String[] args) {
    strtGame();
  }

  public static void printLns(String[] args) {
    System.out.print("\033[H\033[2J");
    for(String str : args)
      System.out.println(str);
  }

  public static void strtGame() {
    System.out.print("Would you like to start a new game (Y/N): ");
    while(true) {
      String ans = scan.nextLine();
      if(ans.equalsIgnoreCase("y")) {
        System.out.print("\033[H\033[2J");
        game();
        break;
      } else if(ans.equalsIgnoreCase("n")) {
        scan.close();
        break;
      } else {
        System.out.print("Please input a valid response (Y/N): ");
      }
    }
  }

  static void game() {
    System.out.print("How many decks would you like to play with: ");
    Deck gameDeck;
    while(true) {
      try {
        int input = scan.nextInt();
        if(input <= 0) throw new InputMismatchException();
        gameDeck = new Deck(input);
        scan.nextLine();
        break;
      } catch(InputMismatchException e) {
        scan.nextLine();
        System.out.print("Please input a valid repsonse (Integer > 0): ");
        continue;
      }
    }
    ArrayList<Deck> playerHand = new ArrayList<Deck>(1);
    playerHand.add(new Deck());
    Deck opponentHand = new Deck();
    playerHand.get(0).addCards(new Card[] {gameDeck.getRandCard()});
    opponentHand.addCards(new Card[] {gameDeck.getRandCard()});
    playerHand.get(0).addCards(new Card[] {gameDeck.getRandCard()});
    opponentHand.addCards(new Card[] {gameDeck.getRandCard()});
    System.out.print("\033[H\033[2J");
    System.out.println("Your Hands: ");
    System.out.println(playerHand.get(0).getCardValues());
    if(playerHand.get(0).getTotalValue() == 21 || opponentHand.getTotalValue() == 21) {
      System.out.println("Opponent's Hand: " + opponentHand.getCardValues());
      if(opponentHand.getTotalValue() != 21) {
        System.out.println("You Win!");
      } else if(playerHand.get(0).getTotalValue() != 21) {
        System.out.println("You Lose :(");
      } else {
        System.out.println("Push");
      }
      strtGame();
      return;
    }
    System.out.println("Opponent's Hand: " + opponentHand.getCardValues().substring(0, opponentHand.getCardValues().length() - opponentHand.getDeck().get(opponentHand.getDeck().size() - 1).val.length()) + "?");
    ArrayList<Deck> finishedDecks = new ArrayList<Deck>(0);
    while(playerHand.size() > 0) {
      for(int i = 0; i < playerHand.size(); ++i) {
        Deck playerDeck = playerHand.get(i);
        boolean split = false;
        ArrayList<String> temp = new ArrayList<String>(2);
        temp.add(playerDeck.getDeck().get(0).val.substring(0, playerDeck.getDeck().get(0).val.length() - 1));
        temp.add(playerDeck.getDeck().get(1).val.substring(0, playerDeck.getDeck().get(1).val.length() - 1));
        if(temp.get(0).equals(temp.get(1)) && temp.size() == 2 && playerHand.size() < 4) {
          split = true;
          System.out.print("Would you like to hit, stay, or split: ");
        } else {
          System.out.print("Would you like to hit or stay: ");
        }
        String ans = scan.nextLine();
        if(ans.equalsIgnoreCase("hit")) {
          playerDeck.addCards(new Card[] {gameDeck.getRandCard()});
          System.out.print("\033[H\033[2J");
          System.out.println("Your Hands: ");
          for(Deck playerDeck1 : playerHand)
            System.out.println(playerDeck1.getCardValues());
          System.out.println("Opponent's Hand: " + opponentHand.getCardValues().substring(0, opponentHand.getCardValues().length() - opponentHand.getDeck().get(opponentHand.getDeck().size() - 1).val.length()) + "?");
          if(playerDeck.getTotalValue() > 21) {
            System.out.println("You Bust :(");
            playerHand.remove(playerDeck);
          } else if(playerDeck.getTotalValue() == 21 || playerDeck.getDeck().get(0).val.substring(0, 1).equals("A") && playerHand.indexOf(playerDeck) != 0) {
            finishedDecks.add(playerDeck);
            playerHand.remove(playerDeck);
          }
        } else if(ans.equalsIgnoreCase("stay")) {
          finishedDecks.add(playerDeck);
          playerHand.remove(playerDeck);
          for(Deck playerDeck1 : playerHand)
            System.out.println(playerDeck1.getCardValues());
          System.out.println("Opponent's Hand: " + opponentHand.getCardValues().substring(0, opponentHand.getCardValues().length() - opponentHand.getDeck().get(opponentHand.getDeck().size() - 1).val.length()) + "?");
        } else if(split && ans.equalsIgnoreCase("split")) {
          playerHand.add(new Deck());
          playerHand.get(playerHand.size() - 1).addCards(new Card[] {playerDeck.getDeck().get(1), gameDeck.getRandCard()});
          playerDeck.removeCards(new Card[] {playerDeck.getDeck().get(1)});
          playerDeck.addCards(new Card[] {gameDeck.getRandCard()});
          System.out.print("\033[H\033[2J");
          System.out.println("Your Hands: ");
          for(Deck playerDeck1 : playerHand)
            System.out.println(playerDeck1.getCardValues());
          System.out.println("Opponent's Hand: " + opponentHand.getCardValues().substring(0, opponentHand.getCardValues().length() - opponentHand.getDeck().get(opponentHand.getDeck().size() - 1).val.length()) + "?");
          i++;
        }
      }
    }
    if(finishedDecks.size() == 0) {
      System.out.println("Opponent's Hand: " + opponentHand.getCardValues());
      strtGame();
      return;
    }
    while(true) {
      if(opponentHand.getTotalValue() < 17) {
        opponentHand.addCards(new Card[] {gameDeck.getRandCard()});
        if(opponentHand.getTotalValue() > 21) {
          System.out.print("\033[H\033[2J");
          System.out.println("Your Hands: ");
          for(Deck playerDeck1 : finishedDecks)
            System.out.println(playerDeck1.getCardValues());
          System.out.println("Opponent's Hand: " + opponentHand.getCardValues());
          System.out.println("Opponent Busts :)");
          strtGame();
          return;
        }
      } else {
        break;
      }
    }
    System.out.print("\033[H\033[2J");
    System.out.println("Your Hands: ");
    for(Deck playerDeck : finishedDecks)
      System.out.println(playerDeck.getCardValues());
    System.out.println("Opponent's Hand: " + opponentHand.getCardValues());
    for(Deck playerDeck : finishedDecks) {
      if(opponentHand.getTotalValue() > playerDeck.getTotalValue())
        System.out.println("You Lose :(");
      else if(opponentHand.getTotalValue() < playerDeck.getTotalValue())
        System.out.println("You Win!");
      else
        System.out.println("Push");
    }
    strtGame();
  }
}

class Deck {
  private ArrayList<Card> deck = new ArrayList<Card>(0);
  
  Deck() {}
  
  Deck(int num) {
    for(int i = 0; i < num; ++i)
      deck.addAll(genDeck());
  }

  private ArrayList<Card> genDeck() {
    ArrayList<Card> tempArray = new ArrayList<Card>();
    String[] suites = {"D", "H", "C", "S"};
    String[] values = {"A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"};
    for (int i = 0; i < 52; ++i) {
      int n = i % 13 + 1;
      tempArray.add(new Card(Math.min(n, 10), values[n - 1] + suites[(int) (i / 13)]));
    }
    return tempArray;
  }

  public Card getRandCard() {
    int rand = new Random().nextInt(deck.size());
    Card card = deck.get(rand);
    deck.remove(rand);
    return card;
  }

  public void addCards(Card[] cards) {
    for(Card card : cards)
      deck.add(card);
  }

  public void removeCards(Card[] cards) {
    for(Card card : cards)
      deck.remove(card);
  }

  public ArrayList<Card> getDeck() {
    return deck;
  }

  public String getCardValues() {
    String temp = Arrays.toString(deck.stream().map((v) -> v.val).toArray());
    return temp.substring(1, temp.length() - 1);
  }

  public int getTotalValue() {
    int sum = 0;
    int numAces = 0;
    for(int val : deck.stream().map((v) -> v.num).toList()) {
      if(val == 1) {
        numAces++;
        sum += 11;
      } else {
        sum += val;
      }
    }
    while(sum > 21 && numAces > 0) {
      sum -= 10;
      numAces--;
    }
    return sum;
  }
}

class Card {
  int num;
  String val;
  
  Card(int n, String v) {
    num = n;
    val = v;
  }
}