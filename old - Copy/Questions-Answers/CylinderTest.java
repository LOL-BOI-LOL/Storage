//Question 8b

import java.util.Scanner;

public class CylinderTest {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    System.out.print("\033[2J\033[HPlease input radius and height of the cylinder (r,h): ");
    String[] inputs = scan.nextLine().split(",");
    Cylinder cylinder = new Cylinder(Integer.parseInt(inputs[0]), Integer.parseInt(inputs[1]));
    System.out.println(cylinder.getVolume());
  }
}