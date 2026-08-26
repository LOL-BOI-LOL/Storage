import java.util.Scanner;

class Main {
  private static int num;
  
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    while (true) {
      System.out.print("\033[H\033[2J");
      while (true) {
        try {
          System.out.print("Input Number of Digits: ");
          num = scan.nextInt();
          scan.nextLine();
          if (num < 0)
            throw new Exception();
          break;
        } catch (Exception e) {
          scan.nextLine();
          System.out.println("Invalid Input");
          continue;
        }
      }
      System.out.println("-----------------------");
      System.out.println("Recursive: " + arrToStr(createFibSeq()) + "\n-----------------------");
      System.out.println("Iterative: " + arrToStr(iterFibSeq()) + "\n-----------------------");
      boolean b = false;
      while (true) {
        System.out.print("Again? (yes/no): ");
        String in = scan.nextLine();
        if (in.equalsIgnoreCase("yes") || in.equalsIgnoreCase("y"))
          break;
        else if (in.equalsIgnoreCase("no") || in.equalsIgnoreCase("n")) {
          b = true;
          break;
        }
        System.out.println("Answer Not Valid");
      }
      if (b) break;
    }
    scan.close();
  }

  public static long[] createFibSeq() {
    long[] arr = new long[num];
    for (int i = 0; i < num && i < 2; ++i)
      arr[i] = i;
    if (num > 2) {
      long[] temp = fibSeq(0, arr[0], arr[1]);
      for (int i = 0; i < temp.length; ++i)
        arr[i + 2] = temp[i];
    }
    return arr;
  }
  
  public static long[] fibSeq(int i, long old, long cur) {
    if (i == num - 3) return new long[] {old + cur};
    long[] arr = new long[num - i - 2];
    arr[0] = old + cur;
    long[] temp = fibSeq(i + 1, cur, old + cur);
    for (int index = 0; index < temp.length; ++index)
      arr[index + 1] = temp[index];
    return arr;
  }

  public static long[]iterFibSeq() {
    long[] arr = new long[num];
    for (int i = 0; i < num; ++i) {
      if (i < 2) arr[i] = i;
      else {
        arr[i] = arr[i - 2] + arr[i - 1];
      }
    }
    return arr;
  }

  public static String arrToStr(long[] arr) {
    String temp = "";
    for (int i = 0; i < arr.length; ++i) {
      temp += arr[i];
      if (i != arr.length - 1) temp += ", ";
    }
    return temp;
  }
}