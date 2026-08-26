import java.util.Arrays;
import java.util.ArrayList;
import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    try (Scanner scan = new Scanner(System.in)) {
      int num = scan.nextInt();
      scan.nextLine();
      String[] arr = new String[num];
      for (int i = 0; i < num; ++i)
        arr[i] = scan.nextLine();
      for (int i = 0; i < num; ++i) {
        String[] words = arr[i].split("[|]");
        if (words.length != 2) {
          if (words.length == 0)
            System.out.println("| = ANAGRAM");
          else
            System.out.println(words[0] + "| = NOT AN ANAGRAM");
          continue;
        } else if (words[0].equals(words[1])) {
          System.out.println(words[0] + "|" + words[1] + " = NOT AN ANAGRAM");
          continue;
        }
        ArrayList<Character> letters1 = new ArrayList<>();
        for (int index = 0; index < words[0].length(); ++index)
          letters1.add(words[0].charAt(index));
        ArrayList<Character> letters2 = new ArrayList<>();
        for (int index = 0; index < words[1].length(); ++index)
          letters2.add(words[1].charAt(index));
        boolean anagram = false;
        for (int index = 0; index < letters1.size(); ++index)
          if (!letters2.remove(letters1.get(index))) anagram = true;
        System.out.print(words[0] + "|" + words[1] + " = ");
        if (letters2.size() > 0 || anagram)
          System.out.println("NOT AN ANAGRAM");
        else
          System.out.println("ANAGRAM");
      }
    } catch (Exception e) {
      System.out.println("Invalid Input");
    }
  }
}