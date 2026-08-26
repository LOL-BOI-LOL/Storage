import java.util.Scanner;
import java.util.regex.*;

class Main {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    System.out.println("Please Input The Text To Be Analyzed:");
    String[] txt = scan.nextLine().replaceAll("[^a-zA-Z\\s]", "").replaceAll("[\\s{2,}]", " ").split("\s");
    for (String word : txt) {
      System.out.println(word);
    }
  }
}