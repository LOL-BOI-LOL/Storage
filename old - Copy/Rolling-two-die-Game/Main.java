import java.util.Scanner;

class Main {
  private static Scanner scan = new Scanner(System.in);
  public static void main(String[] args) {
    System.out.print("\033[H\033[2J");
    while (true) {
      System.out.print("Would you like to start a new game (y/n): ");
      String in = scan.nextLine();
      if (in.equalsIgnoreCase("y")) game();
      else if (in.equalsIgnoreCase("n")) break;
      else System.out.println("Unknown Input");
    }
  }
  public static void game() {
    int[][] nums = new int[2][2];
    for (int i = 0; i < 4; ++i) nums[i / 2][i % 2] = rand(1, 6);
    System.out.println("\033[H\033[2JYour numbers: " + nums[0][0] + ", " + nums[0][1] + "\nComputer's numbers: " + nums[1][0] + ", " + nums[1][1]);
    if (nums[0][0] + nums[0][1] > nums[1][0] + nums[1][1]) System.out.println("YOU WIN");
    else if (nums[0][0] + nums[0][1] < nums[1][0] + nums[1][1]) System.out.println("you lose");
    else System.out.println("Tie");
  }
  public static int rand(int min, int max) { return (int) Math.floor(Math.random() * (max - min + 1)) + min; }
}