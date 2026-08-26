import java.util.Scanner;
import java.util.Arrays;  
import java.util.ArrayList;

class Main {
  public static void main(String[] args) {
    try (Scanner scan = new Scanner(System.in)) {
      int num = scan.nextInt();
      scan.nextLine();
      for (int i = 0; i < num; ++i) {
        int s = scan.nextInt();
        scan.nextLine();
        String[] str = scan.nextLine().split(" ");
        int[] arr = new int[str.length];
        for (int index = 0; index < str.length; ++index)
          arr[index] = Integer.parseInt(str[index]);
        Arrays.sort(arr);
        ArrayList<Integer> l = new ArrayList<>(arr.length);
        for (int n : arr) l.add(n);
        for (int index = l.get(0); index < s + l.get(0); ++index)
          if (l.indexOf(index) == -1) System.out.println(index);
      }
    }
  }
}