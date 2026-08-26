import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    try (Scanner scan = new Scanner(System.in)) {
      int num = scan.nextInt();
      scan.nextLine();
      for (int i = 0; i < num; ++i) {
        String str = scan.nextLine();
        int count = 0;
        for (char c : str.toCharArray())
          if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') ++count;
        System.out.println(count);
      }
    } catch (Exception e) {
      System.out.println("Invalid Input");
    }
  }
}