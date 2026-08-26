public class Books {
  public String title;
  public String type;
  public int date;
  Books(String tt, String ty, int d) {
    title = tt;
    type = ty;
    date = d;
  }
  public void printTitle() {
    System.out.println(title);
  }
  public void printDate() {
    System.out.println(date);
  }
}