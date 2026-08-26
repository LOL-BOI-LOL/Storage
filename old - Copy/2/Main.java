class Main {
  public static void main(String[] args) {
    long sum = 2;
    long num1 = 1;
    long num2 = 2;
    while (num1 + num2 < 4000000) {
      long temp = num1 + num2;
      if (temp % 2 == 0) sum += temp;
      temp = num2;
      num2 = num1 + num2;
      num1 = temp;
    }
    System.out.println(sum);
  }
}