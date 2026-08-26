public class Rectangle extends Polygon {
  private double width, length;
  public Rectangle(double w, double l) {
    width = w;
    length = l;
  }
  public double perimeter() {
    return 2 * width + 2 * length;
  } 
}