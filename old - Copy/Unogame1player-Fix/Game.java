import java.util.Scanner;
import java.util.ArrayList;

public class Game {
  private Scanner scan = new Scanner(System.in);
  private Hand drawPile;
  private Hand playPile;
  public void newGame() {
    System.out.print("\033[2J\033[H");
    while (true) {
      System.out.print("New Game? (Y/N): ");
      String line = scan.nextLine().toLowerCase();
      if (line.equals("y")) {
        break;
      } else if (line.equals("n")) {
        return;
      }
    }
    strtGame();
  }
  private void strtGame() {
    genDrawPile();
    playPile = new Hand();
    playPile.addCard(drawPile.getRandCard());
    Hand playerHand = createHand();
    Hand compHand = createHand();
    while (true) {
      System.out.print("Your hand: ");
      playerHand.printDeck();
      System.out.println("Computer's hand size: " + compHand.getHand().size());
      Card topCard = playPile.getHand().get(playPile.getHand().size() - 1);
      if (topCard.getNumber() != -1) {
        System.out.println("Card in play: " + topCard.getColor() + " " + topCard.getNumber());
      } else {
        System.out.println("Card in play: " + topCard.getColor() + " " + topCard.getSpecial());
      }
      while (true) {
        System.out.print("Would you like to draw or play a card?: ");
        String line = scan.nextLine();
        if (line.equalsIgnoreCase("draw")) {
          playerHand.addCard(drawPile.getRandCard());
          break;
        } else {
          String[] lines = line.split(" ", 2);
          Card card;
          try {
            card = new Card(lines[0], Integer.parseInt(lines[1]));
          } catch (Exception e) {
            card = new Card(lines[0], lines[1]);
          }
          System.out.println(card.getColor() + " " + card.getNumber() + " " + card.getSpecial());
          if (playerHand.checkForCard(card)) {
            if (card.getColor().equals("Any") || card.getColor().equals(topCard.getColor()) || (card.getNumber().equals(topCard.getNumber()) && card.getSpecial().equals(topCard.getSpecial()))) {
              if (card.getNumber() != -1) {
                System.out.println("You played " + card.getColor() + " " + card.getNumber());
              } else {
                System.out.println("You played " + card.getColor() + " " + card.getSpecial());
              }
              playerHand.removeCard(card);
              playPile.addCard(card);
              break;
            } else {
              System.out.println("That card can not be played right now.");
            }
          } else {
            System.out.println("That card was not found.");
          }
        }
      }
      //Comp turn
    }
  }
  private void genDrawPile() {
    drawPile = new Hand();
    String[] clrs = {"Green", "Red", "Blue", "Yellow"};
    String[] specials = {"Skip", "Reverse", "Draw 2", "Wild", "Skip", "Reverse", "Draw 2", "Draw 4"};
    int[] nums = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    for (String clr : clrs) {
      for (int num : nums) {
        drawPile.addCard(new Card(clr, num));
      }
      for (String special : specials) {
        if(special.equals("Wild") || special.equals("Draw 4")) {
          drawPile.addCard(new Card("Any", special));
        } else {
          drawPile.addCard(new Card(clr, special)); 
        }
      }
    }
  }
  private Hand createHand() {
    Hand hand = new Hand();
    for (int i = 0; i < 7; ++i) {
      hand.addCard(drawPile.getRandCard());
    }
    return hand;
  }
}