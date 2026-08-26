import random
import time
from fractions import Fraction

num_doors = int(input("Number of Doors: "))
num_trials = int(input("Number of Trials: "))
switch = int(input("Switch(0/1): "))
res = 0
start_time = time.time()

for _ in range(num_trials):
  doors = [0] * num_doors
  i = random.randint(0, num_doors - 1)
  doors[i] = 1
  
  if switch:
    possible = list(range(1, num_doors))
    del possible[i - 1]
    
    del doors[possible[random.randint(0, len(possible) - 1)]]

    if doors[1]:
      res += 1
  else:
    if doors[0]:
      res += 1
      
print(str(round(time.time() - start_time, 5)) + " seconds")
if switch:
  print("Theoretical: " + str(round((num_doors - 1) / (num_doors * (num_doors - 2)) * 100, 10)).ljust(13, "0") + "%")
else:
  print("Theoretical: " + str(round(1 / num_doors * 100, 10)).ljust(13, "0") + "%")
print("Experimental: " + str(round(res / num_trials * 100, 10)).ljust(13, "0") + "%")