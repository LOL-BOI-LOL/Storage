class Main {
  public static void main(String[] args) {
    Animal[] arr = new Animal[]{new Pig(8), new Cow(1), new Dog(5), new Dog(2), new Pig(3)};
    for (Animal a : arr) {
      System.out.println(a.creature);
      a.talk();
      System.out.println(a.getAge());
      a.setAge(10);
      System.out.println(a.getAge());
    }
  }
}