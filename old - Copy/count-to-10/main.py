import math
import random

count = int(input())
for test_case in range(count):
  num_bits = int(input())
  sum = int(math.pow(2, num_bits))
  for i in range(sum):
    print(bin(i)[2:].rjust(num_bits, '0'))