public class Student {
  protected int studentId;
  protected String studentName;
  public Student(int id, String name) {
    studentId = id;
    studentName = name;
  }
  public String getInfo() {
    return studentName + ": " + studentId;
  }
}