import java.util.Scanner;

class Main {
  private static Scanner scan = new Scanner(System.in);
  public static void main(String[] args) {
    calc();
    scan.close();
  }
  private static void calc() {
    double[] nums = {0, 0};
    System.out.print("\033[H\033[2J");
    while (true) {
      System.out.print("Number 1: ");
      try {
        nums[0] = scan.nextDouble();
        scan.nextLine();
        break;
      } catch (Exception e) {
        scan.next();
      }
    }
    while (true) {
      System.out.print("Number 2: ");
      try {
        nums[1] = scan.nextDouble();
        scan.nextLine();
        break;
      } catch (Exception e) {
        scan.next();
      }
    }
    boolean done = false;
    while (!done) {
      System.out.print("Operator: ");
      switch (scan.nextLine()) {
        case "+":
          System.out.println("Sum: " + (nums[0] + nums[1]));
          done = true;
          break;
        case "-":
          System.out.println("Difference: " + (nums[0] - nums[1]));
          done = true;
          break;
        case "*":
          System.out.println("Product: " + (nums[0] * nums[1]));
          done = true;
          break;
        case "/":
          System.out.println("Quotient: " + (nums[0] / nums[1]));
          done = true;
          break;
        case "^":
          System.out.println("Power: " + Math.pow(nums[0], nums[1]));
          done = true;
          break;
        case "%":
          System.out.println("Modulus: " + (nums[0] % nums[1]));
          done = true;
          break;
      }
    }
  }
}