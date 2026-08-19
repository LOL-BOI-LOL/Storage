from math import sqrt

class VerticalSurface:
  start = [0, 0]
  end = [0, 0]
  vector = [0, 0]
  size = 0
  norm = [0, 0]
  
  def __init__(self, start, end):
    self.start = start
    self.end = end
    self.vector = [end[0] - start[0], end[1] - start[1]]
    self.size = sqrt(self.vector[0] ** 2 + self.vector[1] ** 2)
    self.norm = [self.vector[1] / self.size, -self.vector[0] / self.size]
  
  def __str__(self):
    return (str(self.start) + ",," + str(self.end) + ";").replace(" ", "")
  
  def find_side(self, point):
    v = [point[0] - self.start[0], point[1] - self.start[1]]
    check = round((v[0] - (self.vector[0] * v[0] + self.vector[1] * v[1]) / (self.size ** 2) * self.vector[0]) / self.norm[0], 6)
    return (check > 0) * 1 + (check < 0) * -1
    
  def intersection(self, plane):
    t = (self.vector[1] * (plane.start[0] - self.start[0]) + self.vector[0] * (self.start[1] - plane.start[1])) / (plane.vector[1] * self.vector[0] - plane.vector[0] * self.vector[1])
    return [plane.start[0] + plane.vector[0] * t, plane.start[1] + plane.vector[1] * t]
  
  def divided(self, plane):
    side_start = plane.find_side(self.start)
    side_end = plane.find_side(self.end)
    
    if side_start == side_end:
      return ([self] if side_start > 0 else [], [self] if side_start < 0 else [], [self] if side_start == 0 else [])
    elif side_start * side_end == 0:
      return ([self] if side_start > 0 or side_end > 0 else [], [self] if side_start < 0 or side_end < 0 else [], [])
    else:
      point = self.intersection(plane)
      (l1, l2) = (VerticalSurface(self.start, point), VerticalSurface(point, self.end))
      return [[l1] if side_start > 0 else [l2], [l2] if side_start > 0 else [l1], []]

class Node:
  prev = None
  sides = []
  front = None
  back = None
  
  def __init__(self, prev, sides=[]):
    self.prev = prev
    self.sides = sides
    
  def branch(self):
    temp = self.sides[1:]
    self.sides = self.sides[:1]
    
    for side in temp:
      res = side.divided(self.sides[0])
      for s in res[0]:
        if self.front == None:
          self.front = Node(self, [s])
        else:
          self.front.sides += [s]
      for s in res[1]:
        if self.back == None:
          self.back = Node(self, [s])
        else:
          self.back.sides += [s]
      for s in res[2]:
        self.sides += [s]
        
    if self.front != None:
      self.front.branch()
    if self.back != None:
      self.back.branch()

  def render(self, view_point):
    order = self.sides[0].find_side(view_point)
    
    if order > 0:
      if self.back != None:
        self.back.render(view_point)
      for s in self.sides:
        print(s, end="")
      if self.front != None:
        self.front.render(view_point)
    else:
      if self.front != None:
        self.front.render(view_point)
      if order != 0:
        for s in self.sides:
          print(s, end="")
      if self.back != None:
        self.back.render(view_point)

sides = [
  VerticalSurface([-2, 0], [-1, 4]),
  VerticalSurface([-1, 3], [0, 2]),
  VerticalSurface([0, 3], [0, 1]),
  VerticalSurface([0, 2], [1, 3]),
  VerticalSurface([1, 4], [2, 0]),
  VerticalSurface([-2, 0], [0, 2])
]

tree = Node(None, sides)
tree.branch()
tree.render([-1,-1])