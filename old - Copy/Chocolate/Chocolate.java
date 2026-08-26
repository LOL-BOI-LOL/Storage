public class Chocolate{
  public String type;
  public String size;
  public double cost;
 
  public Chocolate(String t, String sz, double c){
    type = t;
    size = sz;
    cost = c;
  }
  public Chocolate(String sz, double c){
    size = sz;
    cost = c;
  }
  public Chocolate(double c){
    cost = c;
  }
}