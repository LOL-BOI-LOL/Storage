import java.util.Scanner;
import java.util.ArrayList;
import java.util.regex.*;
  
class Main {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    String letters = "abcdefghijklmnopqrstuvwxyz";
    int numIterations;
    while (true) {
      System.out.print("Number of Test Cases: ");
      try {
        numIterations = scan.nextInt();
        scan.nextLine();
        break;
      } catch (Exception e) {
        scan.nextLine();
        System.out.println("Invalid Input\nInput Must Be Integer");
        continue;
      }
    }
    for (int i = 0; i < numIterations; ++i) {
      String in;
      while (true) {
        System.out.print("Input: ");
        in = scan.nextLine();
        if (Pattern.matches(".{0,}[^a-z\s]+.{0,}", in)) {
          System.out.println("Invalid Input\nInput Has To Be Only Lowercase Letters And Spaces");
          continue;
        }
        break;
      }
      int key;
      while (true) {
        System.out.print("Key: ");
        try {
          key = scan.nextInt();
          scan.nextLine();
          break;
        } catch (Exception e) {
          scan.nextLine();
          System.out.println("Invalid Input\nInput Must Be Integer");
          continue;
        }
      }
      String out = "";
      for (char c : in.toCharArray()) {
        if (c != ' ') {
          int index = letters.indexOf(c) + key;
          while (index >= letters.length()) index -= 26;
          while (index < 0) index += 26;
          out += letters.charAt(index);
        } else {
          out += " ";
        }
      }
      System.out.println(out);
    }
  }
}