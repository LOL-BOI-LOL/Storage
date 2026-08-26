import java.util.Scanner;
import java.util.Arrays;
import java.util.ArrayList;

class Main {
  public static void main(String[] args) {
    try (Scanner scan = new Scanner(System.in)) {
      int numCases = scan.nextInt();
      scan.nextLine();
      for (int testCase = 0; testCase < numCases; ++testCase) {
        int numAst = scan.nextInt();
        scan.nextLine();
        ArrayList<Integer[]> coords = new ArrayList<>(numAst);
        for (int ast = 0; ast < numAst; ++ast) {
          String[] in = scan.nextLine().split(" ");
          coords.add(new Integer[] {Integer.parseInt(in[0]), Integer.parseInt(in[1])});
        }
        ArrayList<Double> dist = new ArrayList<>(numAst);
        for (int ast = 0; ast < numAst; ++ast)
          dist.add(Math.sqrt(Math.pow(coords.get(ast)[0], 2) + Math.pow(coords.get(ast)[1], 2)));
        Integer[][] sortedCoords = new Integer[numAst][2];
        for (int i = 0; i < numAst; ++i) {
          int min = 0;
          for (int index = 1; index < dist.size(); ++index)
            if (dist.get(index) < dist.get(min)) min = index;
          sortedCoords[i] = coords.get(min);
          coords.remove(min);
          dist.remove(min);
        }
        for (Integer[] arr : sortedCoords)
          System.out.println(arr[0] + " " + arr[1]);
      }
    }
  }
}