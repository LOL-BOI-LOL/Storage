import java.util.Scanner;
import java.util.HashMap;
import java.util.ArrayList;

class Main {
  private static HashMap<String, Integer> speeds = new HashMap<>(3);
  public static void main(String[] args) {
    speeds.put("A", 10);
    speeds.put("B", 20);
    speeds.put("C", 30);
    try (Scanner scan = new Scanner(System.in)) {
      int num = scan.nextInt();
      scan.nextLine();
      for (int testCase = 0; testCase < num; ++testCase) {
        int l = scan.nextInt();
        scan.nextLine();
        HashMap<String, Integer[]> shipInfo = new HashMap<>(l);
        ArrayList<String> ships = new ArrayList<>(l);
        for (int index = 0; index < l; ++index) {
          String[] ship = scan.nextLine().split("_");
          String[] coords = ship[1].split(":")[1].split(",");
          shipInfo.put(ship[0], new Integer[] {Integer.parseInt(coords[0]), Integer.parseInt(coords[1]), speeds.get(ship[1].split(":")[0])});
          ships.add(ship[0]);
        }
        ArrayList<String> sorted = new ArrayList<>(l);
        for (int index = 0; index < l; ++index) {
          String min = ships.get(0);
          for (int ind = 1; ind < ships.size(); ++ind) {
            Integer[][] infos = new Integer[][] {shipInfo.get(ships.get(ind)), shipInfo.get(min)};
            if (infos[0][0] < infos[1][0] || (infos[0][0] == infos[1][0] && infos[0][1] > infos[1][1]))
              min = ships.get(ind);
          }
          sorted.add(min);
          ships.remove(min);
          for (String s : ships) {
            shipInfo.replace(s, new Integer[] {shipInfo.get(s)[0] - shipInfo.get(s)[2], shipInfo.get(s)[1], shipInfo.get(s)[2]});
          }
        }
        for (String str : sorted)
          System.out.println("Destroyed Ship: " + str + " xLoc: " + shipInfo.get(str)[0]);
      }
    }
  }
}