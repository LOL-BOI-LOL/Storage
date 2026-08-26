class Main {
  public static void main(String[] args) {
    Integer[][] arr = new Integer[4][5];
    for (int i = 0; i < arr.length; ++i) {
      for (int i1 = 0; i1 < arr[i].length * 2; i1 += 2)
        arr[i][i1 / 2] = i1 + i * arr[i].length * 2;
    }
    for (Integer[] nums : arr) for (Integer num : nums) System.out.print(num + ", ");
    System.out.println("\n-----------------");
    for (int i = 0; i < arr.length; ++i) {
      for (int i1 = 0; i1 < arr[i].length; ++i1)
        System.out.print(arr[i][i1] + ", ");
    }
  }
}