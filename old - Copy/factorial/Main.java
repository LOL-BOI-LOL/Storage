import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    try (Scanner scan = new Scanner(System.in)) {
      int num = scan.nextInt();
      scan.nextLine();
      for (int i = 0; i < num; ++i) {
        int in = scan.nextInt();
        scan.nextLine();
        long product = 1;
        for (int index = 2; index <= in; ++index) {
          product *= index;
        }
        System.out.println(product);
      }
    }
  }
}