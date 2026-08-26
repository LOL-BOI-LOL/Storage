import java.util.*;

class Main {
  public static void main(String[] args) {
    ArrayList<Symbol> syms = new ArrayList<>(Arrays.asList(new Symbol("A"), new Symbol(5.21), new Symbol()));
    for(Symbol sym : syms) {
      System.out.println(sym.txt);
      System.out.println(sym.symbol);
      System.out.println(sym.number);
    }
  }
}

/*

1.21 2 √ (9 / 2) ^ 3 * (5 - 3) + 2 

*/