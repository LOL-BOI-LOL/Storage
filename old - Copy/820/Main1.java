import java.util.Scanner;
import java.util.ArrayList;

class Main {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    while (true) {
      long sum = 0;
      int input;
      while (true) {
        System.out.print("Input Int: ");
        try {
          input = scan.nextInt();
          break;
        } catch (Exception e) {
          scan.next();
          System.out.println("An exception occured");
        }
      }
      long strt = System.nanoTime();
      String[] res = getRepeat(input);
      System.out.println("Repeating Decimal: " + res[0] + ", At Decimal Place: " + res[1] + ", Repeating Decimal Length: " + res[0].length());
      System.out.println((System.nanoTime() - strt) / Math.pow(10, 9) + " seconds");
    }
  }
  
  public static String[] getRepeat(int d) {
    ArrayList<Integer> divisors = new ArrayList<Integer>();
    ArrayList<Integer[]> check = new ArrayList<Integer[]>();
    int num = 10;
    while (true) {
      check.add(new Integer[] {num, divisors.size() + 1});
      divisors.add(num / d);
      if (num % d == 0) {
        return new String[] {"0", String.valueOf(divisors.size() + 1)};
      } else if (num > d) {
        num = num % d * 10;
        for (Integer[] numA : check) {
          if (numA[0] == num) {
            String temp = "";
            for (int i = numA[1] - 1; i < divisors.size(); ++i)
              temp += divisors.get(i);
            return new String[] {temp, numA[1].toString()};
          }
        }
      } else {
        num *= 10;
      }
    }
  }
}