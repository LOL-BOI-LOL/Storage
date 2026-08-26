class Main {
  private static int[] itemsSold = {10, 20, 30, 40, 50};
  private static double[] wages;
  public static void main(String[] args) {
    computeWages(10.0, 1.5);
    for (double num : wages) System.out.println(num);
  }
  public static double computeBonusThreshold() {
    int[] nums = {itemsSold[0], itemsSold[0], 0};
    for (int num : itemsSold) {
      if (num < nums[0]) nums[0] = num;
      if (num > nums[1]) nums[1] = num;
      nums[2] += num;
    }
    return (nums[2] - nums[0] - nums[1]) / (itemsSold.length - 2.0);
  }
  public static void computeWages(double fixedWage, double perItemWage) {
    wages = new double[itemsSold.length];
    for (int i = 0; i < itemsSold.length; ++i) wages[i] = (fixedWage + perItemWage * itemsSold[i]) * (itemsSold[i] > computeBonusThreshold() ? 1.1 : 1);
  }
}