for _ in range(int(input())):
  (w, l, start) = map(int, input().split())
  curPos = start - 1
  
  obstacles = []
  
  for _ in range(int(input())):
    obstacles.append(list(map(int, input().split())))

  commands = input()

  for _ in range(w + 2):
    print("=", sep="", end="")
  print()
  print("|", sep="", end="")
  for i in range(w):
    if i == curPos:
      print("v", sep="", end="")
    else:
      print(" ", sep="", end="")
  print("|", sep="")
  for _ in range(w + 2):
    print("-", sep="", end="")
  print()

  crash = False
  
  for i in range(l):
    print("|", sep="", end="")
    row = [" "] * w
    for ob in obstacles:
      if (i + 1) % ob[0] == 0:
        row[ob[1] - 1] = "o"

    if commands[i] == "L":
      if not curPos == 0:
        curPos -= 1
    elif commands[i] == "R":
      if not curPos == w - 1:
        curPos += 1

    if row[curPos] == "o":
      row[curPos] = "X"
      crash = True
    else:
      row[curPos] = "v"
      
    for c in row:
      print(c, sep="", end="")
    print("|", sep="")

    if crash:
      print("You Crashed - GAME OVER")
      break

  if not crash:
    for _ in range(w + 2):
      print("=", sep="", end="")
    print()
    print("Course Complete!")