import java.util.ArrayList;
import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    ArrayList<Integer> arr = new ArrayList<Integer>();
    Scanner scan = new Scanner(System.in);
    System.out.print("\033[H\033[2J");
    for (int i = 0; i < 3; ++i) {
      while (true) {
        try {
          System.out.print("Enter Integer: ");
          arr.add(scan.nextInt());
          break;
        } catch (Exception e) {
          scan.next();
          System.out.println("Input was not a valid Integer");
          continue;
        }
      }
    }
    System.out.println("--------------");
    printElements(arr);
    arr.add(0, 1);
    arr.add(0, 2);
    arr.add(2, 3);
    printElements(arr);
    arr.set(2, 0);
    printElements(arr);
    arr.remove(1);
    printElements(arr);
  }
  public static void printElements(ArrayList<Integer> arr) {
    for (Integer num : arr) System.out.print(num + " ");
    System.out.println("\n--------------");
  }
}