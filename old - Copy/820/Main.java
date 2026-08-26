import java.util.Scanner;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.math.MathContext;

class Main1 {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    long sum = 0;
    int input;
    while (true) {
      System.out.print("Input Long: ");
      try {
        input = scan.nextInt();
        break;
      } catch (Exception e) {
        scan.next();
        System.out.println("An exception occured");
      }
    }
    MathContext mc = new MathContext(input, RoundingMode.DOWN);
    long strt = System.nanoTime();
    for (int i = 2; i <= input; ++i) {
      String num = new BigDecimal(1).divide(new BigDecimal(i), mc).toPlainString();
      if (num.length() > input + 1) sum += num.charAt(input + 1) - '0';
    }
    System.out.println(sum);
    System.out.println((System.nanoTime() - strt) / Math.pow(10, 9) + " seconds");
  }
}