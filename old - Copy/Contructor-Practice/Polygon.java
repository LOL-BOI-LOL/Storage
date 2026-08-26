public class Polygon {
  static public String type = "Polygon";
  public int sides;
  public String color;

  public Polygon(int s, String c) {
    sides = s;
    color = c;
  }
  public Polygon(int s) {
    sides = s;
  }
  public Polygon() {}
}