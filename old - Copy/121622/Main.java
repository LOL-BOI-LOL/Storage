import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    int length;
    while (true) {
      while (true) {
        System.out.print("Input Int: ");
        try {
          length = scan.nextInt();
          if (length > 0) break;
        } catch (Exception e) {
          scan.next();
        }
      }
      double[] array = new double[length];
      String temp = "";
      for (int i = 0; i < length; ++i)
        array[i] = Math.sqrt(i);
      for (double num : array)
        temp += num + ", ";
      System.out.println(temp.substring(0, temp.length() - 3));
      temp = "";
      for (int i = 0; i < length; i += 2)
        array[i] = Math.pow(22 + i, 2);
      for (double num : array)
        temp += num + ", ";
      System.out.println("-----------------------\n" + temp.substring(0, temp.length() - 3));
      }
    }
}