import java.util.Random;
import java.util.ArrayList;

public class Hand {
  private ArrayList<Card> hand = new ArrayList();
  public Hand(ArrayList<Card> cards) {
    for(int i = 0; i < cards.size(); ++i) {
      hand.add(cards.get(i));
    }
  }
  public Hand() {}
  public Card getRandCard() {
    int rand = new Random().nextInt(hand.size());
    Card card = hand.get(rand);
    hand.remove(rand);
    return card;
  }
  public boolean checkForCard(Card card) {
    for (int i = 0; i < hand.size(); ++i) {
      if (hand.get(i).getColor().equals(card.getColor()) && hand.get(i).getNumber() == card.getNumber() && hand.get(i).getSpecial().equals(card.getSpecial())) {
        return true;
      }
    }
    return false;
  }
  public Card getCard(Card card) {
    for (int i = 0; i < hand.size(); ++i) {
      if (hand.get(i).getColor().equals(card.getColor()) && hand.get(i).getNumber() == card.getNumber() && hand.get(i).getSpecial().equals(card.getSpecial())) {
        return hand.get(i);
      }
    }
    return new Card("Any", -1);
  }
  public void removeCard(Card card) {
    for (int i = 0; i < hand.size(); ++i) {
      if (hand.get(i).getColor().equals(card.getColor()) && hand.get(i).getNumber() == card.getNumber() && hand.get(i).getSpecial().equals(card.getSpecial())) {
        hand.remove(i);
      }
    }
  }
  public void printDeck() {
    for (int i = 0; i < hand.size(); ++i) {
      if (hand.get(i).getNumber() != -1) {
        System.out.print(hand.get(i).getColor() + " " + hand.get(i).getNumber()); 
      } else {
        System.out.print(hand.get(i).getColor() + " " + hand.get(i).getSpecial()); 
      }
      if (i != hand.size() - 1) {
        System.out.print(", ");
      } else {
        System.out.print("\n");
      }
    }
  }
  public ArrayList<Card> getHand() { return hand; }
  public void addCard(Card card) { hand.add(card); }
}