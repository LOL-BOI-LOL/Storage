class Main {
  public static void main(String[] args) {
    Color[] clrs = new Color[] {new Color("Aquamarine", "#7FFFD4"), new Color("Maroon", new Integer[] {128, 0, 0}), new Color("Gold")};
    for(Color clr : clrs) {
      System.out.println(clr.name);
      System.out.println(clr.hex);
      System.out.println(clr.rgb);
      System.out.println();
    }
    System.out.println(clrs[0].className);
    System.out.println(clrs[0].info);
    System.out.println();
    System.out.println(Color.className);
    System.out.println(Color.info);
  }
}