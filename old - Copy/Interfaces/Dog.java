public class Dog implements Animal {
  private int age;

  public Dog(int x) {
    age = x;
  }

  public void talk() {
    System.out.println("Woof");
  }

  public int getAge() {
    return age;
  }

  public void setAge(int x) {
    age = x;
  }
}