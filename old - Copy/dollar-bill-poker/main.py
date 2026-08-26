for _ in range(int(input())):
  original = input()
  print(original + " = ", end = "")
  serial_number = list(map(lambda x : int(x), [*original]))
  while serial_number.count(0):
    serial_number.remove(0)
  stop = False
  for i in range(9):
    if serial_number.count(i + 1) >= 5:
      print("FIVE OF A KIND")
      stop = True
      break
  if stop:
    continue
  for i in range(9):
    if serial_number.count(i + 1) == 4:
      print("FOUR OF A KIND")
      stop = True
      break
  if stop:
    continue
  for i in range(9):
    if serial_number.count(i + 1) == 3:
      for index in range(9):
        if index != i and serial_number.count(index + 1) >= 2:
          print("FULL HOUSE")
          stop = True
          break
  if stop:
    continue
  for i in range(5):
    if serial_number.count(i + 1) >= 1:
      if serial_number.count(i + 2) >= 1:
        if serial_number.count(i + 3) >= 1:
          if serial_number.count(i + 4) >= 1:
            if serial_number.count(i + 5) >= 1:
              print("STRAIGHT")
              stop = True
              break
  if stop:
    continue
  for i in range(9):
    if serial_number.count(i + 1) == 3:
      print("THREE OF A KIND")
      stop = True
      break
  if stop:
    continue
  for i in range(9):
    if not(stop) and serial_number.count(i + 1) == 2:
      for index in range(9):
        if i != index and serial_number.count(index + 1) == 2:
          print("TWO PAIR")
          stop = True
          break
  if stop:
    continue
  for i in range(9):
    if serial_number.count(i + 1) == 2:
      print("PAIR")
      stop = True
      break
  if stop:
    continue
  for i in reversed(range(9)):
    if serial_number.count(i + 1) == 1:
      print(i + 1)
      break
  if stop:
    continue
  print("0")