public class APStudent extends Student {
  protected String apClass;
  public APStudent(int id, String name, String className) {
    super(id, name);
    apClass = className;
  }
  @Override
  public String getInfo() {
    return super.getInfo() + ", Class: " + apClass;
  }
}