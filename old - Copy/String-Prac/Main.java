class Main {
  public static void main(String[] args) {
    String a = "sing the song";
    String b = "ng";
    int x = a.indexOf(b);
    while (x >= 0) {
      a = a.substring(0, x) + a.substring(x + b.length());
      x = a.indexOf(b);
    }
    System.out.println(a);
  }
}