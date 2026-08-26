import java.util.Scanner;
import java.util.Arrays;

class Main {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    System.out.print("Number of Items: ");
    int num = scan.nextInt();
    scan.nextLine();
    String[] arr = new String[num];
    for (int i = 0; i < num; ++i)
      arr[i] = scan.nextLine();
    Arrays.sort(arr);
    System.out.print("Value to Find: ");
    System.out.println(binarySearch(0, num, scan.nextLine(), arr));
  }

  public static int binarySearch(int min, int max, String val, String[] arr) {
    if (min > max - 1) return -1;
    int middle = (max - min) / 2;
    if (val.compareTo(arr[middle]) > 0)
      return binarySearch(middle + 1, max, val, arr);
    else if (val.compareTo(arr[middle]) < 0)
      return binarySearch(min, middle, val, arr);
    else
      return middle;
  }
}