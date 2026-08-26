public class Cow implements Animal {
  private int age;

  public Cow(int x) {
    age = x;
  }

  public void talk() {
    System.out.println("Moo");
  }

  public int getAge() {
    return age;
  }

  public void setAge(int x) {
    age = x;
  }
}