public class Student {
  private String studentName;
  private long studentID;
  private double studentGrade;
  public Student(long id, double grade) {
    studentID = id;
    studentGrade = grade;
  }
  public void setName(String name) { studentName = name; }
  public String getName() { return studentName; }
  public long getID() { return studentID; }
  public double getGrade() { return studentGrade; }
  public String letterGrade() {
    if(studentGrade > 90) return "A";
    else return "study harder";
  }
  public void printStudent() { System.out.println(studentName + " " + studentID); }
}