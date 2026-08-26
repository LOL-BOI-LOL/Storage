class Main {
  public static void main(String[] args) {
    int x = 5;
    int y = 7;
    int sum = x + y;
    if (x > 4 && sum == 12)
      System.out.println("AND statement");
    if (!(x == y || y < x))
      System.out.println("NOR statement");
  }
}