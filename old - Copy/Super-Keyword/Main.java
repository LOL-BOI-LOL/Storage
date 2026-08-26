class Main {
  public static void main(String[] args) {
    Vechile truck = new Car();
    truck.drive();
  }
  public static class Vechile {
    public void drive() { System.out.print("Driving"); }
  }
  public static class Car extends Vechile {
    @Override
    public void drive() {
      super.drive();
      System.out.println(" Car");
    }
  }
}