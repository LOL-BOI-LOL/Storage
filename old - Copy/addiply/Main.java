import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    try (Scanner scan = new Scanner(System.in)) {
      int num = scan.nextInt();
      scan.nextLine();
      for (int i = 0; i < num; ++i) {
        String[] inputs = scan.nextLine().split(" ");
        System.out.print(Integer.parseInt(inputs[0]) + Integer.parseInt(inputs[1]) + " ");
        System.out.println(Integer.parseInt(inputs[0]) * Integer.parseInt(inputs[1]));
      }
    } catch (Exception e) {
      System.out.println("Invalid Input");
    }
  }
}