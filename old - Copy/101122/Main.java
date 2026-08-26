class Main {
  public static void main(String[] args) {
    Books[] books = {
      new Books("Intro to Python", "non-fiction", 2000),
      new Books("Intro to JS", "non-fiction", 2018)
    };
    for (Books book : books) {
      book.printTitle();
      book.printDate();
    }
  }
}