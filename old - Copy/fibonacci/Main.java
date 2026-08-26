import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    try (Scanner scan = new Scanner(System.in)) {
      int num = scan.nextInt();
      scan.nextLine();
      for (int testCase = 0; testCase < num; ++testCase) {
        int pos = scan.nextInt();
        scan.nextLine();
        long o = 0;
        long n = 1;
        System.out.print(pos + " = ");
        if (pos == 1) System.out.println("0");
        else if (pos == 2) System.out.println("1");
        else {
          for (int i = 2; i < pos; ++i) {
            long temp = n;
            n = o + n;
            o = temp;
          }
          System.out.println(n);
        }
      }
    }
  }
}