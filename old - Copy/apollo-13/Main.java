import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    try (Scanner scan = new Scanner(System.in)) {
      int num = scan.nextInt();
      scan.nextLine();
      for (int testCase = 0; testCase < num; ++testCase) {
        String[] in = scan.nextLine().split(" ");
        for (int i = 0; i < 3; ++i) {
          Double val = Double.parseDouble(in[i]) - 180;
          while (val < 0) val += 360;
          while (val >= 360) val -= 360;
          val = Math.floor(100 * val) / 100.0;
          String str = val.toString();
          if (str.indexOf(".") == -1) str += ".";
          while (str.indexOf(".") < 3) str = "0" + str;
          while (str.length() < 6) str += "0";
          System.out.print(str);
          if (i != 2) System.out.print(" ");
        }
        if (testCase != num - 1)
          System.out.println();
      }
    }
  }
}