/*
  Sep 7, 2022
  Person
  Practicing Comments
*/

class Main {
  public static void main(String[] args) {
    for(int i = 0; i < args.length; i++) {
      if(checkStr(args[i])) {
        System.out.println(Double.parseDouble(args[i]));
      }
    }
    if(args.length == 0) {
      System.out.println("No Arguments Provided");
      System.out.println(10/3);
      System.out.println(10.0/3);
      System.out.println(10%3);
    }
  }
  public static boolean checkStr(String args) {
    try {
      Double.parseDouble(args);
      return true;
    } catch(Exception e) {
      System.out.println(e);
      return false;
    }
  }
}