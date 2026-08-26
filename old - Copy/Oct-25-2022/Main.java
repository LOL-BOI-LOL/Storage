class Main {
  public static void main(String[] args) {
    Student s = new Student(123456789, 99.99);
    System.out.println("Name: " + s.getName());
    System.out.println("ID: " + s.getID());
    System.out.println("Grade: " + s.getGrade());
    System.out.println("Letter Grade: " + s.letterGrade());
    s.setName("John");
    System.out.println("New Name: " + s.getName());
    s.printStudent();
  }
}