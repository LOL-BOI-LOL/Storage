import re
num_test_cases = int(input())
for test_case in range(num_test_cases):
  lines = list(map(lambda x: int(x), input().split(" ")))
  triplets = {}
  for i in range(lines[0]):
    for val in input().split(" "):
      triplets[re.sub("[!]", "", val)[0]] = "!" in val
  for i in range(lines[1]):
    tripletsInt = {}
    for index, val in enumerate(map(lambda x: int(x), input().split(" "))):
      char = chr(index + 65)
      if triplets[char]:
        tripletsInt[char] = 1 - val
      else:
        tripletsInt[char] = val
    solution = True
    for index in range(lines[0]):
      keys = list(triplets.keys())
      if not tripletsInt[keys[index * 3]] and not tripletsInt[keys[index * 3 + 1]] and not tripletsInt[keys[index * 3 + 2]]:
        solution = False
    print(str(solution).upper())