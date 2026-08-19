import math
import random

costs = [[3, 9, 9, 9], [3, 9, 5, 8], [9, 9, 7, 1], [9, 9, 8, 9]]
costs = []
for i in range(30):
  costs.append([])
  for j in range(30):
    if random.randint(0, 10) < 3 and i > 2 and j > 2 and i < 28 and j < 28:
      costs[-1].append(math.inf)
    else:
      costs[-1].append(random.randint(1, 100))

arr = []
unvisited = []
visited = []
start = (10, 5)
end = (23, 21)

class Node:
  dist = math.inf
  cost = 0
  prev = None
  pos = None
  
  def __init__(self, pos, cost=1):
    self.pos = pos
    self.cost = cost
  
  def updateDist(self, prev):
    if self.cost + prev.dist < self.dist:
      self.prev = prev
      self.dist = self.cost + prev.dist
    
def update_unvisited():
  visited.append(unvisited.pop(0))
  unvisited.sort(key=lambda x: x.dist)

for i in range(len(costs)):
  temp = []
  
  for j in range(len(costs[i])):
    temp.append(Node((i, j), costs[i][j]))
  
  arr.append(temp)
  
for a in arr:
  print(list(map(lambda x: x.cost, a)))

arr[start[0]][start[1]].dist = 0

for row in arr:
  for val in row:
    unvisited.append(val)
unvisited.sort(key=lambda x: x.dist)

cur_node = arr[start[0]][start[1]]
while True:
  if cur_node.pos == end:
    break
  
  for v in (-1, 1):
    if cur_node.pos[0] + v >= 0 and cur_node.pos[0] + v < len(arr):
      arr[cur_node.pos[0] + v][cur_node.pos[1]].updateDist(arr[cur_node.pos[0]][cur_node.pos[1]])
      
    if cur_node.pos[1] + v >= 0 and cur_node.pos[1] + v < len(arr[cur_node.pos[0]]):
      arr[cur_node.pos[0]][cur_node.pos[1] + v].updateDist(arr[cur_node.pos[0]][cur_node.pos[1]])
  
  visited.append(unvisited.pop(0))
  unvisited.sort(key=lambda x: x.dist)
  
  if len(unvisited) == 0:
    print("No Path Found")
    break
  
  cur_node = unvisited[0]
  
print(cur_node.dist)
indices = []
indices.append(cur_node.pos)
while cur_node.prev != None:
  cur_node = cur_node.prev
  indices.append(cur_node.pos)
  
for i in range(len(arr)):
  for j in range(len(arr[i])):
    if (i, j) in indices:
      if (i, j) == start:
        print("\U0001F6A6", sep="", end="")
      elif (i, j) == end:
        print("\U000026D4", sep="", end="")
      else:
        print("\U0001F7E9", sep="", end="")
    else:
      if arr[i][j].cost > 1000:
        print("\U0001F7E5", sep="", end="")
      else:
        print("\U00002B1B", sep="", end="")
  print()