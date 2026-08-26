public class Car {
  private String name;
  private int year;
  private long miles;
  public Car(String n, int y, long m) {
    name = n;
    year = y;
    miles = m;
  }
  public String getName() { return name; }
  public long getMiles() { return miles; }
  public void setName(String n) { name = n; }
  public void setMiles(long n) { miles = n; }
}