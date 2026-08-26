public class Animal {
  private static String type = "Animal";
  private static int numberEyes = 2;
  private String name;
  private int numberLegs;
  public Animal(String n, int numL) {
    name = n;
    numberLegs = numL;
  }
  public Animal(String n) {
    name = n;
  }
  public String getName() {
    return name;
  }
  public void setName(String n) {
    name = n;
  }
  public void printName() {
    System.out.println("This " + type.toLowerCase() + " is called a " + name + ".");
  }
  public void printName(String description) {
    System.out.println("This " + type.toLowerCase() + " is called a " + name + ". " + description + " Also, the " + name + " has " + numberLegs + " legs and " + numberEyes + " eyes.");
  }
}