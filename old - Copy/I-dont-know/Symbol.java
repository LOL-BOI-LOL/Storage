public class Symbol {
  static public String txt = "This is a symbol!";
  public String symbol;
  public double number;
  Symbol(String sym) {
    try {
      number = Double.parseDouble(sym);
    } catch (Exception e) {
      symbol = sym;
    }
  }
  Symbol(double num) {
    number = num;
  }
  Symbol() {}
}