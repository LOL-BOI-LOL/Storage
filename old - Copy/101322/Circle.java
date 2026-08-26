public class Circle {
  public double radius;
  public Circle(double r) {
    radius = r;
  }
  public void getArea() {
    System.out.println(3.14 * radius * radius);
  }
  public void getCircumference() {
    System.out.println(6.28 * radius);
  }
  public static void main(String[] args) {
    Circle c = new Circle(5.5);
    c.getArea();
    c.getCircumference();
  }
}

/*
The code works because it is being called in a main method.
*/