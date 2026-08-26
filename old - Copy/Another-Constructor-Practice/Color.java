import java.util.*;

public class Color {
  static public String className = "The name of this class is Color";
  static public String info = "This class is used to define colors using rgb or hex.";
  public String name;
  public String hex;
  public ArrayList<Integer> rgb = new ArrayList<Integer>(3);

  public Color(String n, String clr) {
    name = n;
    hex = clr;
  }

  public Color(String n, Integer[] clr) {
    name = n;
    rgb.addAll(Arrays.asList(clr));
  }

  public Color(String n) {
    name = n;
  }
}