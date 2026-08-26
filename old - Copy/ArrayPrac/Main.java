class Main {
  public static void main(String[] args) {
    int[] a = new int[10];
    for (int i = 0; i < 10; ++i) a[i] = i * i;
    for (int n : a) System.out.println(n);
    System.out.println("--------------------");
    for (int n : a) if (n % 2 == 0) System.out.println(n);
  }
}