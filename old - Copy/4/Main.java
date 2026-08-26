class Main {
  public static void main(String[] args) {
    long max = 0;
    for (long i1 = 999; i1 >= 100; --i1) {
      for (long i2 = 999; i2 >= 100; --i2) {
        String product = Long.toString(i1 * i2);
        if (product.equals(new StringBuilder(product).reverse().toString()) && i1 * i2 > max) max = i1 * i2;
      }
    }
    System.out.println(max);
  }
}