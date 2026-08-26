public class Rectangle {
  private double base;
  private double height;
  public Rectangle(double b, double h) {
    base = b;
    height = h;
  }
  public double getArea() {
    return base * height;
  }
}