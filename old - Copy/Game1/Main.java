import java.util.Scanner;
class Main {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    System.out.print("\033[H\033[2J");
    String input;
    while (true) {
      System.out.print("Rock, Paper, or Scissors (r, p, s): ");
      input = scan.nextLine();
      if (input.equalsIgnoreCase("r")) break;
      else if (input.equalsIgnoreCase("p")) break;
      else if (input.equalsIgnoreCase("s")) break;
      System.out.println("Please try again!");
    }
    String[] options = {"r", "p", "s"};
    String comp = options[(int) Math.random() * 3];
    System.out.println("Computer: " + comp);
    if (input.equalsIgnoreCase(comp)) System.out.println("Tie");
    else if ((input.equalsIgnoreCase("r") && comp.equals("s"))
             ||
             (input.equalsIgnoreCase("p") && comp.equals("r"))
             ||
             (input.equalsIgnoreCase("s") && comp.equals("p"))
            ) System.out.println("You Win");
    else System.out.println("You Lose");
    scan.close();
  }
}