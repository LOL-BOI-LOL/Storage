class Main {
  public static void main(String[] args) {
    Polygon polys[] = new Polygon[] {new Polygon(5, "Yellow"), new Polygon(3), new Polygon()};
    System.out.println(Polygon.type);
    System.out.println(polys[0].type);
    for(Polygon p : polys) {
      System.out.println(p.sides);
      System.out.println(p.color);
    }
  }
}