//Aidan McLaughlin

class Main {
  public static void main(String[] args) {
    Animal[] animals = {new Animal("Dolphin"), new Animal("Dog", 4)};
    String[] descripts = {"A dolphin is an aquatic animal that lives mainly in oceans.", "A dog is a terrestial animal that is a common pet in many households."};
    for (int i = 0; i < 2; ++i) {
      System.out.println(animals[i].getName());
      animals[i].setName(animals[i].getName().toLowerCase());
      System.out.println(animals[i].getName());
      animals[i].printName();
      animals[i].printName(descripts[i]);
    }
  }
}