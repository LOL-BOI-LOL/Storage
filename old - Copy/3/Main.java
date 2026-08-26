import java.util.ArrayList;
import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    ArrayList<Long> factors = new ArrayList<Long>();
    long number;
    while (true) {
      System.out.print("Number to find factors of: ");
      try {
        number = scan.nextLong();
        break;
      } catch (Exception e) {
        scan.next();
        System.out.println("An exception occured");
      }
    }
    
    long i = 2;
    while (number > 1) {
      if (number % i == 0) { 
        factors.add(i);
        number /= i;
        i = 2;
      } else ++i;
    }
    for (long num : factors) System.out.println(num);
  }
}