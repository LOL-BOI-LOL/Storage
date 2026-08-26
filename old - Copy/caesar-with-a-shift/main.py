import re
num_test_cases = int(input())
for test_case in range(num_test_cases):
  message = input()
  shift = list(map(lambda x: int(x), input().split(" ")))
  direction = list(map(lambda x: int(x), input().split(" ")))
  shift_counter = 0
  direction_counter = 0
  for index, character in enumerate(message):
    if re.search("[A-Z]", character) == None:
      continue
    i = ord(character)
    if direction[direction_counter]:
      i -= shift[shift_counter]
    else:
      i += shift[shift_counter]
    while i < 65:
      i += 26
    while i > 90:
      i -= 26
    if direction[direction_counter]:
      message = message[:index] + chr(i) + message[index + 1:]
    else:
      message = message[:index] + chr(i) + message[index + 1:]
    shift_counter += 1
    direction_counter += 1
    if shift_counter >= len(shift):
      shift_counter = 0
    if direction_counter >= len(direction):
      direction_counter = 0
  print(message.lower())