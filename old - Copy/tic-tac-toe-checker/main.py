num = int(input())
for test_case in range(num):
  inp = input()
  state = list(inp)
  for i, s in enumerate(state):
    if s == "X":
      state[i] = 1
    elif s == "O":
      state[i] = -1
    else:
      state[i] = 0
  sum = [0, 0, 0, 0, 0, 0, 0, 0]
  for i in range(3):
    sum[0] += state[i]
    sum[1] += state[i + 3]
    sum[2] += state[i + 6]
    sum[3] += state[i * 3]
    sum[4] += state[i * 3 + 1]
    sum[5] += state[i * 3 + 2]
    sum[6] += state[i * 3 + i]
    sum[7] += state[i * 3 + 2 - i]
  win = [any(s == 3 for s in sum), any(s == -3 for s in sum)]
  print(inp + " = ", end = "")
  if (win[0] and win[1]) or not (win[0] or win[1]):
    print("TIE")
  elif win[0]:
    print("X WINS")
  else:
    print("O WINS")