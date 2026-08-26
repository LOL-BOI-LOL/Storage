public class Pig implements Animal {
  private int age;

  public Pig(int x) {
    age = x;
  }

  public void talk() {
    System.out.println("Oink");
  }

  public int getAge() {
    return age;
  }

  public void setAge(int x) {
    age = x;
  }
}