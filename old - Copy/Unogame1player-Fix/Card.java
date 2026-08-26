public class Card {
  private String color;
  private String special;
  private int number = -1;
  public Card(String c, int n) {
    color = c;
    number = n;
  }
  public Card(String c, String s) {
    color = c;
    special = s;
  }
  public String getColor() { return color; }
  public String getSpecial() { return special; }
  public int getNumber() { return number; }
}