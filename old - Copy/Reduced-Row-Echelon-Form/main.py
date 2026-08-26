from fractions import Fraction

def addRows(row1, row2):
  row_final = []
  
  for i in range(len(row1)):
    row_final.append(row1[i] + row2[i])

  return row_final

def scalarRow(row, multi):
  return list(map(lambda x: x * multi, row))

def cleanRow(row):
  return list(map(Fraction, row))

def cleanMatrix(matrix):
  return list(map(lambda row: cleanRow(row), matrix))

matrix = []

for _ in range(int(input())):
  matrix.append(list(map(int, input().split(" "))))

print(matrix)

matrix.sort(key = lambda x: x[0], reverse=True)
matrix = cleanMatrix(matrix)
col = 0

for row in range(len(matrix)):
  if col >= len(matrix[row]):
    break
  
  if matrix[row][col] == 0:
    foundNonZero = False
    
    for r in range(row + 1, len(matrix)):
      if matrix[r][col] != 0:
        matrix[row] = addRows(matrix[row], scalarRow(matrix[r], 1 / (matrix[r][col])))
        foundNonZero = True
        break

    if not foundNonZero:
      row -= 1
      
  elif not matrix[row][col] == 1:
    matrix[row] = scalarRow(matrix[row], 1 / matrix[row][col])

  if matrix[row][col] == 1:
    for r in range(row):
      if matrix[r][col] != 0:
        matrix[r] = addRows(matrix[r], scalarRow(matrix[row], -1 * matrix[r][col] / matrix[row][col]))
    for r in range(row + 1, len(matrix)):
      if matrix[r][col] != 0:
        matrix[r] = addRows(matrix[r], scalarRow(matrix[row], -1 * matrix[r][col] / matrix[row][col]))
  
  col += 1

print("[", ", ".join(list(map(
  lambda row: "[" + ", ".join(list(map(
    lambda val: str(val),
    row
  ))) + "]",
  matrix
))), "]", sep = "")