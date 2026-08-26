import java.util.regex.*;
import java.util.Scanner;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Arrays;

class Main {
  public static void main(String[] args) {
    Pattern p = Pattern.compile("[^a-z]+");
    Scanner scan = new Scanner(System.in);
    String[] words = p.split(scan.nextLine().toLowerCase());
    HashMap<Integer, Integer> lengths = new HashMap<Integer, Integer>();
    int[] minMax;
    if(words[0].length() == 0)
      minMax = new int[]{words[1].length(), words[1].length()};
    else
      minMax = new int[]{words[0].length(), words[0].length()};
    for (String s : words) {
      if (s != "") {
        int length = s.length();
        if(lengths.get(length) != null) {
          lengths.put(length, lengths.get(length) + 1);
        } else {
          lengths.put(length, 1);
          if (length > minMax[1]) minMax[1] = length;
          if (length < minMax[0]) minMax[0] = length;
        }
      }
    }
    double mean = 0;
    double median = 0;
    ArrayList<Integer> orderedA = new ArrayList<Integer>();
    for (int num : lengths.keySet()) {
      for (int i = 0; i < lengths.get(num); ++i) {
        orderedA.add(num);
        mean += num;
      }
    }
    Integer[] ordered = new Integer[orderedA.size()];
    orderedA.toArray(ordered);
    Arrays.sort(ordered);
    mean /= ordered.length;
    if (ordered.length % 2 == 1) median = ordered[ordered.length / 2];
    else median = (ordered[ordered.length / 2 - 1] + ordered[ordered.length / 2]) / 2;
    ArrayList<Integer> temp = new ArrayList<Integer>();
    temp.add(lengths.get(ordered[0]));
    temp.add(ordered[0]);
    for (int num : lengths.keySet()) {
      if (num != temp.get(1)) {
        if (lengths.get(num) > temp.get(0)) {
          while (temp.size() > 0) temp.remove(0);
          temp.add(lengths.get(num));
          temp.add(num);
        } else if (lengths.get(num) == temp.get(0)) {
          temp.add(num);
        }
      }
    }
    temp.remove(0);
    String str = "";
    for (Integer num : temp) { 
      if (str != "") str += ",";
      str += num;
    }
    mean = Math.round(mean * 10) / 10.0;
    median = Math.round(median * 10) / 10.0;
    System.out.println("Average: " + mean + "\nMedian: " + median + "\nModes: " + str + "\nRange: " + (minMax[1] - minMax[0]));
    for (int i = minMax[0]; i <= minMax[1]; ++i) {
      for (int index = 1; index < 2 - i / 10; ++index) {
        System.out.print(" ");
      }
      System.out.print(i + "|");
      if (lengths.get(i) != null) {
        for (int index = 1; index <= lengths.get(i); ++index) {
          System.out.print("x");
        }
      }
      System.out.println("");
    }
  }
}