class Main {
  public static void main(String[] args) {
    Student[] s = {new Student(10101, "John"), new APStudent(10000, "Jeff", "Computer Science A")};
    System.out.println(s[0].getInfo());
    System.out.println(s[1].getInfo());
  }
}