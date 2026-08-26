import java.util.Scanner;

class Main {
  private static Scanner scan = new Scanner(System.in);
  
  public static void main(String[] args) {
    System.out.print("\033[H\033[2J");
    while (true) {
      System.out.print("Would you like to start a new game (Y/N): ");
      String temp = scan.nextLine();
      if (temp.equalsIgnoreCase("y")) game();
      else if (temp.equalsIgnoreCase("n")) break;
      else System.out.println("Unknown Input");
    }
  }

  public static void game() {
    int[] num = {(int) (Math.random() * 10.0) + 1, (int) (Math.random() * 10.0) + 1};
    System.out.println("Your number: " + num[0] + "\nComputer's number: " + num[1]);
  }
}