class Main {
  public static void main(String[] args) {
    long[] nums = new long[3];
    for (long i = 1; i <= 100; ++i) nums[0] += i * i;
    for (long i = 1; i <= 100; ++i) nums[1] += i;
    nums[1] = nums[1] * nums[1];
    nums[2] = nums[0] - nums[1];
    System.out.println(nums[2]);
  }
}