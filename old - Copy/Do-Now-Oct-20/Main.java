class Main {
  public static void main(String[] args) {
    System.out.print("\033[2J\033[H");
    Triangle[] tri = {new Triangle(2.3, 5, 6.9), new Triangle(9, 2.4, 6.5)};    
    System.out.println("Original Side 1: " + tri[0].getSide1());
    tri[0].setSide1(2);
    System.out.println("New Side 1: " + tri[0].getSide1());
    for(Triangle t : tri) {
      System.out.println("----------");
      System.out.print("Perimeter of " + t + ": ");
      t.getPerimeter();
    }
    System.out.println("----------");
    Triangle t = new Triangle(5, 3, 10);
    System.out.println(t.getArea());
    System.out.println(t.getVolume());
  }
}