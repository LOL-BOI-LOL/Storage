import random

weight = 1
test_range = range(*list(map(int, input().split(" "))))
learning_factor = float(input())

for _ in range(int(input())):
  x = random.choice(test_range)
  y = x * 2
  res = weight * x
  weight -= learning_factor * (res - y)
  print(res, y, weight)

# 1 - .25 * 88
#
#