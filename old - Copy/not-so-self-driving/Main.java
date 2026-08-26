import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    try (Scanner scan = new Scanner(System.in)) {
      int num = scan.nextInt();
      scan.nextLine();
      for (int i = 0; i < num; ++i) {
        String[] nums = scan.nextLine().split(":");
        double time = Double.parseDouble(nums[1]) / Double.parseDouble(nums[0]);
        if (time <= 1)
          System.out.println("SWERVE");
        else if(time <= 5)
          System.out.println("BRAKE");
        else
          System.out.println("SAFE");
      }
    } catch (Exception e) {
      System.out.println("Invalid Input");
    }
  }
}