public class RectangularPrism {
  private Rectangle rect;
  private double height;
  public RectangularPrism(double l, double w, double h) {
    rect = new Rectangle(l, w);
    height = h;
  }
  public double getVolume() {
    return rect.getArea() * height;
  }
}