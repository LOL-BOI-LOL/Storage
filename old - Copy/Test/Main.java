class Main {
  public static void main(String[] args) {
    long initial = System.nanoTime();
    while(initial < System.nanoTime() + 1);
    System.out.println("1 nano second has passed.");
  }
}
