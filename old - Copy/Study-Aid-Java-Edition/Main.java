import java.util.ArrayList;
import java.util.Scanner;

class Main {
  private static Scanner scan = new Scanner(System.in);
  private static Key key;
  public static void main(String[] args) {
    System.out.println("Please choose a key to study:");
    for (int i = 0; i < Key.options.length; ++i) System.out.println(i + 1 + ". " + Key.options[i]);
    while (true) {
      try {
        int temp = scan.nextInt() - 1;
        if (temp >= 0 && temp < Key.options.length) key = new Key(Key.options[temp]);
        else continue;
        scan.nextLine();
        break;
      } catch (Exception e) {
        scan.next();
        System.out.println("Please input an integer");
      }
    }
    strtStudy();
    scan.close();
  }
  private static void strtStudy() {
    while (key.size() > 0) {
      String[] question = key.getRandom();
      while (true) {
        System.out.println(question[0]);
        if (scan.nextLine().equals(question[1])) break;
      }
    }
    main(new String[0]);
  }
}