class Main {
  public static void main(String[] args) {
    int length = 100;
    long[] array = new long[length];
    for (int i = 0; i < length; ++i) array[i] = (long) Math.pow(i, 2);
    System.out.print("Squares: ");
    boolean temp = false;
    for (int i = 0; i < array.length; ++i) {
      if (array[i] % 2 != 1) {
        if (temp) System.out.print(", ");
        System.out.print(array[i]);
        temp = true;
      }
    }
    System.out.println("\n-------------------");
    int length2 = 10;
    int[] array2 = new int[length2];
    for (int i = 0; i < length2 * 2; i += 2) array2[i / 2] = i;
    int sum = 0;
    for (int num : array2) sum += num;
    System.out.println(sum);
    System.out.println("-------------------");
    String str = "This is a string";
    char[] array3 = new char[str.length()];
    for (int i = 0; i < str.length(); ++i) array3[i] = str.charAt(i);
    for (char c : array3) System.out.print(c + " ");
    System.out.println("\n-------------------");
    char[] array4 = "This is stringy boi".toCharArray();
    for (char c : array4) System.out.print(c + " ");
  }
}