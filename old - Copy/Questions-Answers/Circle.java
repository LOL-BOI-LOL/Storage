//Question 8a

import java.lang.Math;

public class Circle {
  private int radius;
  public Circle(int r) {
    radius = r;
  }
  public double getArea() {
    return Math.pow(radius, 2) * Math.PI;
  }
}