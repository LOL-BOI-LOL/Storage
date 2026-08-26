public class Polygon {
  private int numSides;
  public Polygon(int n) {
    numSides = n;
  }
  public Polygon() {}
  public double perimeter(int l) {
    return numSides * l;
  }
}