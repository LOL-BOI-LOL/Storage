//Question 7

public class BookTest {
  public static void main(String[] args) {
    Book b = new Book(3);
    b.nextPage();
    System.out.println(b.getPage());
    b.nextPage();
    System.out.println(b.getPage());
    b.nextPage();
    System.out.println(b.getPage());
  }
}