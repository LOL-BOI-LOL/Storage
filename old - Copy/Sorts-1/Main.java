import java.util.Scanner;
import java.util.Arrays;

class Main {
  public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    int[] arr;
    boolean genRand = false;
    while (true) {
      System.out.print("Generate Random Array: ");
      String in = scan.nextLine();
      if (in.equalsIgnoreCase("y") || in.equalsIgnoreCase("yes")) {
        genRand = true;
        break;
      } else if (in.equalsIgnoreCase("n") || in.equalsIgnoreCase("no"))
        break;
    }
    int l = 0;
    while (true) {
      System.out.print("Array Size: ");
      try {
        l = scan.nextInt();
        scan.nextLine();
        break;
      } catch (Exception e) {
        scan.nextLine();
        System.out.println("Invalid Input");
        continue;
      }
    }
    if (genRand) {
      arr = genArr(l, 0, 9);
      System.out.print("Array: ");
      printArr(arr);
      System.out.println();
    } else {
      arr = new int[l];
      for (int i = 0; i < l; ++i) {
        System.out.print("Array Element " + i + ": ");
        while (true) {
          try {
            arr[i] = scan.nextInt();
            scan.nextLine();
            break;
          } catch (Exception e) {
            scan.nextLine();
            System.out.println("Invalid Input");
            continue;
          }
        }
      }
    }
    System.out.print("Quicksort: ");
    printArr(quicksort(arr.clone()));
    System.out.print("\nSelection Sort: ");
    printArr(selectionSort(arr.clone()));
    System.out.print("\nInsertion Sort: ");
    printArr(insertionSort(arr.clone()));
    System.out.print("\nMerge Sort: ");
    printArr(mergeSort(arr.clone()));
    System.out.print("\nPancake Sort: ");
    printArr(pancakeSort(arr.clone()));
    System.out.print("\nStooge Sort: ");
    stoogeSort(arr, 0, arr.length - 1);
    printArr(arr);
  }

  static public void slowsort(int[] arr, int strt, int end) {
    if (end - strt + 1 <= 1) return;
    int mid = (end - strt) / 2 + strt;
    slowsort(arr, strt, mid);
    slowsort(arr, mid + 1, end);
    if (arr[mid] > arr[end]) {
      
    }
  }
  
  static public int[] quicksort(int[] arr) {
    if (arr.length <= 1) return arr;
    int[][] a = new int[2][arr.length];
    for (int i = 0; i < arr.length - 1; ++i) {
      if (arr[i] <= arr[arr.length - 1]) {
        ++a[0][0];
        a[0][a[0][0]] = arr[i];
      } else {
        ++a[1][0];
        a[1][a[1][0]] = arr[i];
      }
    }
    int[] array1 = new int[a[0][0]];
    for (int i = 0; i < array1.length; ++i)
      array1[i] = a[0][i + 1];
    int[] array2 = new int[a[1][0]];
    for (int i = 0; i < array2.length; ++i)
      array2[i] = a[1][i + 1];
    array1 = quicksort(array1);
    array2 = quicksort(array2);
    for (int i = 0; i < arr.length; ++i) {
      if (i < array1.length)
        arr[i] = array1[i];
      else if (i == array1.length)
        arr[i] = arr[arr.length - 1];
      else
        arr[i] = array2[i - array1.length - 1];
    }
    return arr;
  }
  
  static public void stoogeSort(int[] arr, int strt, int end) {
    if (arr[strt] > arr[end]) {
      int temp = arr[strt];
      arr[strt] = arr[end];
      arr[end] = temp;
    }
    if (end - strt + 1 > 2) {
      int temp = (int) Math.ceil((end - strt + 1) * 2.0 / 3.0);
      stoogeSort(arr, strt, strt + temp - 1);
      stoogeSort(arr, end - temp + 1, end);
      stoogeSort(arr, strt, strt + temp - 1);
    }
  }
  
  static public int[] pancakeSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; ++i) {
      int index = 0;
      for (int ind = 0; ind < arr.length - i; ++ind)
        if (arr[index] < arr[ind]) index = ind;
      int[] temp = Arrays.copyOfRange(arr, 0, index + 1);
      for (int ind = temp.length - 1; ind >= 0; --ind)
        arr[temp.length - 1 - ind] = temp[ind];
      temp = Arrays.copyOfRange(arr, 0, arr.length - i);
      for (int ind = temp.length - 1; ind >= 0; --ind)
        arr[temp.length - 1 - ind] = temp[ind];
    }
    return arr;
  }

  static public int[] mergeSort(int[] arr) {
    if (arr.length > 1) {
      int[] a = mergeSort(Arrays.copyOfRange(arr, 0, (arr.length + 1) / 2));
      int[] b = mergeSort(Arrays.copyOfRange(arr, (arr.length + 1) / 2, arr.length));
      int[] indices = {0, 0};
      for (int i = 0; i < arr.length; ++i) {
        if (indices[0] == a.length || (indices[1] < b.length && a[indices[0]] > b[indices[1]])) {
          arr[i] = b[indices[1]];
          ++indices[1];
        } else {
          arr[i] = a[indices[0]];
          ++indices[0];
        }
      }
    }
    return arr;
  }
  
  static public int[] selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; ++i) {
      int min = i;
      for (int ind = i + 1; ind < arr.length; ++ind)
        if (arr[ind] < arr[min]) min = ind;
      if (min != i) {
        int temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
      }
    }
    return arr;
  }

  static public int[] insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; ++i) {
      int index = 0;
      for (int ind = i - 1; ind >= 0; --ind) {
        if (arr[i] > arr[ind]) {
          index = ind + 1;
          break;
        }
      }
      int[] temp = new int[arr.length];
      for (int ind = 0; ind < index; ++ind) temp[ind] = arr[ind];
      temp[index] = arr[i];
      for (int ind = index; ind < arr.length; ++ind) {
        if (ind >= i) {
          if (ind == i) {
            ++ind;
            if (ind >= arr.length) break;
          }
          temp[ind] = arr[ind];
        } else
          temp[ind + 1] = arr[ind];
      }
      arr = temp;
    }
    return arr;
  }

  static public int[] genArr(int length, int min, int max) {
    int[] arr = new int[length];
    for (int i = 0; i < arr.length; ++i)
      arr[i] = (int) (Math.random() * (max - min + 1)) + min;
    return arr;
  }
  
  static public void printArr(int[] a) {
    for (int i = 0; i < a.length; ++i) {
      if (i != 0) System.out.print(", ");
      System.out.print(a[i]);
    }
  }
}