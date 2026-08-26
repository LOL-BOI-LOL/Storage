import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    try (Scanner scan = new Scanner(System.in)) {
      int num = scan.nextInt();
      scan.nextLine();
      for (int i = 0; i < num; ++i) {
        String[] numAnimals = scan.nextLine().split(" ");
        int sum = 0;
        sum += 2 * Integer.parseInt(numAnimals[0]);
        sum += 4 * (Integer.parseInt(numAnimals[1]) + Integer.parseInt(numAnimals[2]));
        System.out.println(sum);
      }
    }
  }
}