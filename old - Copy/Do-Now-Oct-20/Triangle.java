import java.lang.Math;

public class Triangle {
  private double side1, side2, side3;
  private int length, width, height;
  public Triangle(double s1, double s2, double s3) {
    side1 = s1;
    side2 = s2;
    side3 = s3;
  }
  public Triangle(int l, int w, int h) {
    length = l;
    width = w;
    height = h;
  }
  public double getSide1() { return side1; }
  public void setSide1(double s1) { side1 = s1; }
  public void getPerimeter() {
    System.out.println(side1 + side2 + side3);
  }
  public double getArea() {
    return length * width / 2.0;
  }
  public double getVolume() {
    return getArea() * height;
  }
}