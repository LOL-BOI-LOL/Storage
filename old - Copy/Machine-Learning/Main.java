/*
0, 1, 2, 3, 4, 5
None, Empty, Full, Horizontal, Vertical, Diagonal

[0, 1
 2, 3]
*/

import java.util.Arrays;
import java.util.Scanner;

class Main {
  private static Scanner scan = new Scanner(System.in);
  private static int[][] samples;
  private static int[] ans;
  private static double[][][] weights;
  public static void main(String[] args) {
    int size = 20;
    while (true) {
      try {
        System.out.print("Sample Size: ");
        size = scan.nextInt();
        break;
      } catch (Exception e) {
        System.out.println("Not A Valid Size");
        scan.next();
      }
    }
    genSamples(size);
    size = 6;
    while (true) {
      try {
        System.out.print("Nodes Amount: ");
        size = scan.nextInt();
        break;
      } catch (Exception e) {
        System.out.println("Not A Valid Quantity");
        scan.next();
      }
    }
    initial(size);
    String temp = "";
    for (double[][] matrix : weights) {
      for (double[] arr : matrix) {
        temp += "[ ";
        for (double num : arr) temp += num + " ";
        temp += "] ";
      }
    }
    System.out.println(temp);
    System.out.println(useSamples(true));
    System.out.println(train());
    System.out.println(useSamples(true));
    temp = "";
    for (double[][] matrix : weights) {
      for (double[] arr : matrix) {
        temp += "[ ";
        for (double num : arr) temp += num + " ";
        temp += "] ";
      }
    }
    System.out.println(temp);
  }
  public static void genSamples(int size) {
    samples = new int[size][4];
    for (int i = 0; i < size * 4; ++i) samples[i / 4][i % 4] = (int) Math.floor(Math.random() * 2.0);
    ans = new int[size];
    for (int i = 0; i < size; ++i) {
      int sum = Arrays.stream(samples[i]).sum();
      if (sum == 2) {
        if (samples[i][0] == 1 || samples[i][1] == 1) {
          if (samples[i][0] == 1 && samples[i][1] == 1) ans[i] = 3;
          else if (samples[i][0] == 1 && samples[i][3] == 1) ans[i] = 5;
          else if (samples[i][1] == 1 && samples[i][2] == 1) ans[i] = 5;
          else ans[i] = 4;
        } else ans[i] = 3;
      } else if (sum == 0)
        ans[i] = 1;
      else if (sum == 4)
        ans[i] = 2;
      else
        ans[i] = 0;
    }
  }
  public static void printSamples() {
    for (int i = 0; i < samples.length * 4; ++i) {
      System.out.print(samples[i / 4][i % 4] + " ");
      if (i % 2 == 1) System.out.print("\n");
      if (i % 4 == 3) {
        String temp = "";
        switch(ans[i / 4]) {
          case 0 :
            temp = "None";
            break;
          case 1 :
            temp = "Empty";
            break;
          case 2 :
            temp = "Full";
            break;
          case 3 :
            temp = "Horizontal";
            break;
          case 4 :
            temp = "Vertical";
            break;
          case 5 :
            temp = "Diagonal";
            break;
        }
        System.out.println("Ans: " + temp);
      }
    }
  }
  public static void initial(int num) {
    weights = new double[10 * num][2][2];
    for (int i = 0; i < weights.length; ++i) {
      weights[i][0][0] = Math.floor(Math.random() * 30.0 - 10.0) / 10.0;
    }
  }
  public static double train() {
    double acc = useSamples(false);
    for (int ind = 0; ind < 100 && acc < 0.95; ++ind) {
      for (int i = weights.length - 1; i >= 0; --i) {
        for (int i1 = 0; i1 < 4; ++i1) {
          weights[i][0][1] = useSamples(false);
          double[] temp = weights[i][0];
          weights[i][0][0] = Math.min(1, Math.max(-1, (weights[i][0][0] - weights[i][1][0]) * ((1 - weights[i][0][1]) / (weights[i][0][1] - weights[i][1][1]))));
          weights[i][1] = temp;
        }
      }
      acc = useSamples(false);
    }
    return acc;
  }
  public static double useSamples(boolean printAns) {
    double[] cor = {0, 0};
    double[] nodes = new double[weights.length / 10];
    double[] output = new double[6];
    int temp = 0;
    for (int[] sample : samples) {
      for (int i = 0; i < nodes.length; ++i) {
        double sum = 0;
        for (int ind = 0; ind < 4; ++ind) sum += (double) sample[ind] * weights[i * 4 + ind][0][0];
        nodes[i] = 1 / (1 + Math.exp(-1 * sum));
      }
      for (int i = 0; i < 6; ++i) {
        double sum = 0;
        for (int ind = 0; ind < nodes.length; ++ind) sum += nodes[ind] * weights[i * nodes.length + ind + 4 * nodes.length][0][0];
        output[i] = Math.max(0, sum);
      }
      String str = "";
      for (int i = 0; i < 6; ++i) {
        int rounded = (int) Math.round(output[i] * 100000.0) / 100000;
        if (printAns) {
          str += "[" + i + ", " + rounded + "]";
        }
        if ((ans[temp] == i && rounded == 1) || (ans[temp] != i && rounded == 0)) ++cor[0];
        else ++cor[1];
      }
      if (printAns) System.out.println(str + " " + ans[temp]);
      ++temp;
    }
    return cor[0] / (cor[0] + cor[1]);
  }
}

/*

Math.min(
  1,
  Math.max(
    -1,
    (weights[i][0][0] - weights[i][1][0]) * ((1 - weights[i][0][1]) / (weights[i][0][1] - weights[i][1][1]))
  )
)

(curW - pastW) * ((1 - curA) / (curA - pastA))
incrW * missingA / incrA
*/