import re
num = int(input())
for test_case in range(num):
  lines = int(input())
  if lines == 0:
    break
  s = ""
  for line in range(lines):
    s += input()
  s = re.sub("[^a-z]", "", s.lower())
  letters = {}
  for i in range(26):
    letters[chr(97 + i)] = len(re.findall(chr(97 + i), s))
  for l in letters:
    print(l.upper() + ": ", end = "")
    if len(s) > 0 and letters[l] != 0:
      temp = str(round(100.0 * letters[l] / len(s), 2))
      while len(temp.split(".")[1]) < 2:
        temp += "0"
      print(temp + "%")
    else:
      print("0.00%")