class Main {
  public static void main(String[] args) {
    long lcm = 2;
    for (long i = 3; i <= 20; ++i) {
      lcm = lcmFunc(lcm, i);
    }
    System.out.println(lcm);
  }
  public static long lcmFunc(long num1, long num2) {
    long[] nums = {num1, num2};
    while (num1 != num2) {
      if (num1 < num2) {
        num1 += nums[0];
      } else if (num1 > num2) {
        num2 += nums[1];
      }
    }
    return num1;
  }
}