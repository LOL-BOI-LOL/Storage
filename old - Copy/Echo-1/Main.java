import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    try (Scanner scan = new Scanner(System.in)) {
      int num = scan.nextInt();
      scan.nextLine();
      for (int i = 0; i < num; ++i)
        System.out.println(scan.nextLine());
    } catch (Exception e) {
      System.out.println("Invalid Input");
    }
  }
}