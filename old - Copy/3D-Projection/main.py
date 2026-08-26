import numpy as np

"""m1 = np.array([[1, 1, 0], [0, 1, 0], [0, 0, 1]])
m2 = np.array([[1, 2, 3], [1, 8, 3], [1, 2, 9]])

print(m1 @ m2)"""

class Cube:
  def __init__(self, pos, dim):
    self.pos = pos
    self.dim = dim

  def calc_vertices(self):
    return np.array([
      [self.pos[0] - self.dim[0] / 2, self.pos[1] - self.dim[1] / 2, self.pos[2] - self.dim[2] / 2],
      [self.pos[0] + self.dim[0] / 2, self.pos[1] - self.dim[1] / 2, self.pos[2] - self.dim[2] / 2],
      [self.pos[0] - self.dim[0] / 2, self.pos[1] + self.dim[1] / 2, self.pos[2] - self.dim[2] / 2],
      [self.pos[0] + self.dim[0] / 2, self.pos[1] + self.dim[1] / 2, self.pos[2] - self.dim[2] / 2],
      [self.pos[0] - self.dim[0] / 2, self.pos[1] - self.dim[1] / 2, self.pos[2] + self.dim[2] / 2],
      [self.pos[0] + self.dim[0] / 2, self.pos[1] - self.dim[1] / 2, self.pos[2] + self.dim[2] / 2],
      [self.pos[0] - self.dim[0] / 2, self.pos[1] + self.dim[1] / 2, self.pos[2] + self.dim[2] / 2],
      [self.pos[0] + self.dim[0] / 2, self.pos[1] + self.dim[1] / 2, self.pos[2] + self.dim[2] / 2]
    ])

class Camera:
  def __init__(self, pos, angles, fov):
    self.pos = pos
    self.angles = angles
    self.fov = fov

  def calc_display_surface(self):
    return np.array([
      self.pos[0],
      self.pos[1],
      self
    ])