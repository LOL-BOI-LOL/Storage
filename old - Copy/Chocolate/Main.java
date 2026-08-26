class Main {
  public static void main(String[] args) {
    Chocolate c1 = new Chocolate("Dark", "Medium", 2.50);
    Chocolate c2 = new Chocolate("Large", 10.25);
    Chocolate c3 = new Chocolate(0.50);
    System.out.println(c1.type);
    System.out.println(c1.size);
    System.out.println(c1.cost);
    System.out.println(c2.type);
    System.out.println(c2.size);
    System.out.println(c2.cost);
    System.out.println(c3.type);
    System.out.println(c3.size);
    System.out.println(c3.cost);
  }
}