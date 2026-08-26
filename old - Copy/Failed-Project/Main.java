class Main {
  public static void main(String[] args) {
    if(args.length > 0) {
      Operator x = new Operator(args[1].charAt(0));
      System.out.println(x.operation(Double.parseDouble(args[0]), Double.parseDouble(args[2])));
    }
  }
}

class Operator {
  static char op;  
  public Operator(char arg) {
    op = arg;
  }
  public double operation(double num1, double num2) {
    String operators = "+-*/^";
    double[] operations = {num1 + num2, num1 - num2, num1 * num2, num1 / num2, java.lang.Math.pow(num1, num2)};
    return operations[operators.indexOf(op)];
  }
}

class Term {
  static double coef;
  static String[] vars;
  public static void Term(double coeff, String[] var) {
    coef = coeff;
    vars = var;
  }
}