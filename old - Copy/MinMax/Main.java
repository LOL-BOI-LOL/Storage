import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    int[] nums = new int[3];
    System.out.print("\033[H\033[2J");
    for (int i = 0; i < 3; ++i) {
      while (true) {
        System.out.print("Enter int: ");
        try {
          nums[i] = scan.nextInt();
          break;
        } catch (Exception e) {
          scan.next();
          System.out.println("Something went wrong.");
        }
      }
    }
    System.out.println("Minimum: " + min(nums[0], nums[1], nums[2]));
    System.out.println("Maximum: " + max(nums[0], nums[1], nums[2]));
  }
  public static int min(int num1, int num2, int num3) {
    return Math.min(num1, Math.min(num2, num3));
  }
  public static int max(int num1, int num2, int num3) {
    return Math.max(num1, Math.max(num2, num3));
  }
}