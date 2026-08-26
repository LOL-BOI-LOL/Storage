def updateCell(r, c):
  nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  
  for i in range(9):
    if i != c and puzzle[r][i] in nums:
      nums.remove(puzzle[r][i])
    elif i != r and puzzle[i][c] in nums:
      nums.remove(puzzle[i][c])
    elif (i // 3 != r // 3 or i % 3 != c % 3) and puzzle[i // 3 + r // 3 * 3][i % 3 + c // 3 * 3] in nums:
      nums.remove(puzzle[i // 3 + r // 3 * 3][i % 3 + c // 3 * 3])

  if len(nums) == 1:
    puzzle[r][c] = nums[0]
    superPos[r][c] = None
  else:
    superPos[r][c] = nums

def updateSuperPosition():
  for r in range(9):
    for c in range(9):
      if puzzle[r][c] == "_":
        updateCell(r, c)

for _ in range(int(input())):
  puzzle = []
  superPos = []
  
  for r in range(9):
    puzzle.append(list(map(lambda x: int(x) if x != "_" else x, [*input()])))
    superPos.append([])
    for _ in range(9):
      superPos[r].append(None)

  for arr in puzzle:
    print(arr)
  print()
  updateSuperPosition()
  for arr in puzzle:
    print(arr)
  print("------")