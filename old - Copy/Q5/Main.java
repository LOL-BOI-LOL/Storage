import java.util.ArrayList;

class Main {
  public static void main(String[] args) {
    ArrayList<String> arr = new ArrayList<String>(5);
    arr.add("a");
    arr.add("b");
    arr.add("c");
    arr.add("d");
    arr.add("e");
    System.out.println(reverse(arr));
  }
  public static ArrayList<String> reverse(ArrayList<String> arr) {
    ArrayList<String> temp = new ArrayList<String>(arr.size());
    for (String str: arr) temp.add(0, str);
    return temp;
  }
}
