//Aidan M

class Main {
  public static void main(String[] args) {
    System.out.print("\033[2J\033[H");
    Car[] cars = {new Car("Porsche", 2011, 324999), new Car("Mustang", 2001, 199567)};
    String[] newStr = {"Ferrari", "Corvette"};
    long[] newLong = {325000, 200000};
    for(int i = 0; i < 2; ++i) {
      System.out.println("Originial Name: " + cars[i].getName());
      System.out.println("Originial Miles: " + cars[i].getMiles());
      cars[i].setName(newStr[i]);
      cars[i].setMiles(newLong[i]);
      System.out.println("New Name: " + cars[i].getName());
      System.out.println("New Miles: " + cars[i].getMiles());
      System.out.println("----------------");
    }
  }
}