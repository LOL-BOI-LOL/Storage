//Question 7

public class Book {
  private int numPages, currentPage;
  public Book(int param) {
    numPages = param;
    currentPage = 1;
  }
  public int getNum() { return numPages; }
  public int getPage() { return currentPage; }
  public void nextPage() {
    if(currentPage < numPages) {
      ++currentPage;
    }
  }
  
}