class Matrix:
  def __init__(self, values):
    self.matrix = values
    self.size = (len(values), len(values[0]))

  def __str__(self):
    # string = ""
    # max_value_size = max(*map(lambda x: max(*map(lambda x: len(str(x)), x)), self.matrix))
    # print(max_value_size)
    # 
    # for i1, row in enumerate(self.matrix):
    #   for i2, column in enumerate(row):
    #     string += str(column)
    #     
    #     if i2 != len(row) - 1:
    #       string += " "
    #
    #   if i1 != len(self.matrix) - 1:
    #     string += "\n"

    # return string

    strs = list(map(
      lambda row: list(map(str, row)),
      self.matrix
    ))

    maxlen = max(*map(lambda row: max(*map(len, row)), strs))

    out = "\n".join(*map(
      lambda row: " ".join(*map(
        lambda e: e.ljust(maxlen, " "),
        row
      )),
      strs
    ))

    return out
  
  def __mul__(A, scalar):
    res = []

    for i1, row in enumerate(A.matrix):
      res.append([])

      for i2, column in enumerate(row):
        res[i1].append(A.matrix[i1][i2] * scalar)

    return Matrix(res)
  
  def __add__(A, B):
    if not(A.size[0] == B.size[0] and A.size[1] == B.size[1]):
      print("Invalid Matrices for Addition")
      return None

    res = []
    
    for i1, row in enumerate(A.matrix):
      res.append([])
      
      for i2, column in enumerate(row):
        res[i1].append(A.matrix[i1][i2] + B.matrix[i1][i2])

    return Matrix(res)

  def __sub__(A, B):
    return A + B * -1

A = Matrix([[1, 2], [3, 4]])
B = Matrix([[5, 6], [7, 8]])

print(A + B, end="\n---------\n")
print(A - B, end="\n---------\n")
print(A * 5, end="\n---------\n")