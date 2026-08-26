import java.util.Scanner;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.*;

class Main {
  private static final String[] rctTypes = {
    "Combustion",
    "Decomposition",
    "Double Replacement",
    "Single Replacement",
    "Synthesis"
  };
  private static final HashMap<String, Double> amu = new HashMap<String, Double>(15);
  private static Scanner scan = new Scanner(System.in);
  private static void clear() { System.out.print("\033[H\033[2J"); }
  public static void main(String[] args) {
    amu.put("H", 1.008);
    amu.put("Li", 6.941);
    amu.put("Be", 9.012);
    amu.put("B", 10.811);
    amu.put("C", 12.011);
    amu.put("N", 14.007);
    amu.put("O", 15.999);
    amu.put("F", 18.998);
    amu.put("Na", 22.990);
    amu.put("Mg", 24.305);
    amu.put("Al", 26.982);
    amu.put("Si", 28.086);
    amu.put("P", 30.974);
    amu.put("S", 32.066);
    amu.put("Cl", 35.453);
    clear();
    int rt = 1;
    boolean gotRes = false;
    for (int i = 0; i < 999; ++i) {
      for (int index = 0; index < rctTypes.length; ++index) System.out.println(index + 1 + ") " + rctTypes[index]);
      System.out.print("Input Index of Reaction Type: ");
      try {
        rt = scan.nextInt();
        scan.nextLine();
        System.out.println("Is This The Correct Input?: " + rctTypes[rt - 1]);
        String res = scan.nextLine();
        if (res.equalsIgnoreCase("yes") || res.equalsIgnoreCase("y")) {
          gotRes = true;
          break;
        } else continue;
      } catch (Exception e) {
        System.out.println("Invalid Input");
        scan.nextLine();
        continue;
      }
    }
    if (!gotRes) {
      System.out.println("Something went wrong");
      return;
    }
    balReaction(rt);
  }
  public static void balReaction(int type) {
    
    switch (type) {
      case 1:
        System.out.print("Reactant: ");
        ArrayList equa = new ArrayList<>(4);
        ArrayList<String> reactant = getCompound();
        equa.add(reactant);
        reactant = new ArrayList<String>(Arrays.asList("O", "2"));
        equa.add(reactant);
        reactant = new ArrayList<String>(Arrays.asList("C", "1", "O", "2"));
        equa.add(reactant);
        reactant = new ArrayList<String>(Arrays.asList("H", "2", "O", "1"));
        equa.add(reactant);
        
        break;
      case 2:

        break;
      case 3:

        break;
      case 4:

        break;
      case 5:

        break;
    }
  }
  public static ArrayList<String> getCompound() {
    ArrayList<String> reactants = new ArrayList<String>();
    String[] temp = scan.nextLine().split("(?=[A-Z|1-9])");
    for (String s : temp) reactants.add(s);
    for (int i = 1; i < reactants.size(); ++i) {
      if (Pattern.matches("[^1-9]+", reactants.get(i)) && Pattern.matches("[^1-9]+", reactants.get(i - 1)))
        reactants.add(i++, "1");
    }
    if (reactants.size() == 1) reactants.add("1");
    for (int i = 0; i < reactants.size(); i += 2) {
      if (i % 2 == 0 && amu.get(reactants.get(i)) == null) {
        System.out.print("Invalid Element Entered: " + reactants.get(i) + "\nTry Again: ");
        return getCompound();
      }
    }
    return reactants;
  }
}