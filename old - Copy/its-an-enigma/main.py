rotors = [
  [
    [None, None, None],
    lambda i : i + 1,
    lambda i : i + 2,
    lambda i : i + 4,
    lambda i : i - 3,
    lambda i : i + 1,
    lambda i : i - 1,
    lambda i : i + 2,
    lambda i : i,
    lambda i : i + 1,
    lambda i : i - 7,
    lambda i : i + 3, #reverse
    lambda i : i - 1,
    lambda i : i + 7,
    lambda i : i - 2,
    lambda i : i + 1,
    lambda i : i - 1,
    lambda i : i - 4,
    lambda i : i,
    lambda i : i - 2,
    lambda i : i - 1
  ],
  [
    [None, None, None],
    lambda i : i,
    lambda i : i + 2,
    lambda i : i + 3,
    lambda i : i - 1,
    lambda i : i + 2,
    lambda i : i + 4,
    lambda i : i - 5,
    lambda i : i - 3,
    lambda i : i,
    lambda i : i - 2,
    lambda i : i, #reverse
    lambda i : i + 5,
    lambda i : i + 1,
    lambda i : i - 2,
    lambda i : i + 3,
    lambda i : i - 3,
    lambda i : i - 2,
    lambda i : i + 2,
    lambda i : i,
    lambda i : i - 4
  ],
  [
    [None, None, None],
    lambda i : i + 5,
    lambda i : i + 8,
    lambda i : i - 1,
    lambda i : i + 4,
    lambda i : i - 1,
    lambda i : i + 3,
    lambda i : i - 6,
    lambda i : i - 5,
    lambda i : i - 4,
    lambda i : i - 3,
    lambda i : i + 6, #reverse
    lambda i : i + 1,
    lambda i : i + 5,
    lambda i : i + 1,
    lambda i : i + 4,
    lambda i : i - 5,
    lambda i : i + 3,
    lambda i : i - 4,
    lambda i : i - 3,
    lambda i : i - 8
  ],
  [
    [None, None, None],
    lambda i : i + 1,
    lambda i : i + 5,
    lambda i : i + 3,
    lambda i : i - 1,
    lambda i : i + 5,
    lambda i : i - 5,
    lambda i : i + 1,
    lambda i : i - 3,
    lambda i : i - 5,
    lambda i : i - 1,
    lambda i : i + 5, #reverse
    lambda i : i - 1,
    lambda i : i + 1,
    lambda i : i + 5,
    lambda i : i + 3,
    lambda i : i - 3,
    lambda i : i - 5,
    lambda i : i - 1,
    lambda i : i + 1,
    lambda i : i - 5
  ],
  [
    lambda i : i + 3,
    lambda i : i + 5,
    lambda i : i + 6,
    lambda i : i - 3,
    lambda i : i + 1,
    lambda i : i - 1,
    lambda i : i - 5,
    lambda i : i + 2,
    lambda i : i - 6,
    lambda i : i - 2
  ]
]
num_test_cases = int(input())
for test_case in range(num_test_cases):
  rotors[0][0] = [None, None, None]
  rotors[1][0] = [None, None, None]
  rotors[2][0] = [None, None, None]
  rotors[3][0] = [None, None, None]
  r = [0, 1, 2]
  startingPos = [0, 0, 0]
  for i in range(3):
    inp = input().split(" ")
    r[i] = int(inp[0]) - 1
    startingPos[i] = int(inp[1])
    rotors[int(inp[0]) - 1][0][i] = int(inp[1])
  inp = list(map(lambda v : int(v), input()))
  for v in inp:
    res = v
    for i, v in enumerate(r):
      index = res - rotors[v][0][i]
      while index > 9:
        index -= 10
      while index < 0:
        index += 10
      res = rotors[v][index + 1](res)
      while res > 9:
        res -= 10
      while res < 0:
        res += 10
    res = rotors[4][res](res)
    while res > 9:
      res -= 10
    while res < 0:
      res += 10
    r.reverse()
    for i, v in enumerate(r):
      index = res - rotors[v][0][2 - i]
      while index > 9:
        index -= 10
      while index < 0:
        index += 10
      res = rotors[v][index + 11](res)
      while res > 9:
        res -= 10
      while res < 0:
        res += 10
    r.reverse()
    rotors[r[2]][0][2] += 1
    if rotors[r[2]][0][2] > 9:
      rotors[r[2]][0][2] = 0
    if rotors[r[2]][0][2] == startingPos[2]:
      rotors[r[1]][0][1] += 1
      if rotors[r[1]][0][1] > 9:
        rotors[r[1]][0][1] = 0
      if rotors[r[1]][0][1] == startingPos[1]:
        rotors[r[0]][0][0] += 1
        if rotors[r[0]][0][0] > 9:
          rotors[r[0]][0][0] = 0
    print(res, end = "")
  print()