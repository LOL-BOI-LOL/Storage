class Main {
  public static void main(String[] args) {
    if(args.length > 1) {
      Wave w = new Wave(Double.parseDouble(args[0]), args[1]);
      for (String val : w.getVal()) {
        System.out.println(val);
      }
    }
  }
}