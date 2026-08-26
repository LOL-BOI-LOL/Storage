import re

num = int(input())
for i in range(num):
  str = list(map(lambda str : re.sub("[^a-z]", "", str.lower()), input().split("|")))
  bool = False
  for char in str[1]:
    if str[0].find(char) == -1:
      bool = True
      break;
  if bool:
    print("You're not a secret agent!")
  else:
    print("That's my secret contact!")