import pygame
import sys
pygame.init()
ext = True
board = [8,8]
class King(stat,loc,color):
  def __init__(self,stat,loc,color):
    self.loc = loc
    self.stat = stat
    self.color = color
class Queen(stat,loc,color):
  def __init__(self,stat,loc,color):
    self.loc = loc
    self.stat = stat
    self.color = color
class Castle(stat,loc,color):
  def __init__(self,stat,loc,color):
    self.loc = loc
    self.stat = stat
    self.color = color
class Bishop(stat,loc,color):
  def __init__(self,stat,loc,color):
    self.loc = loc
    self.stat = stat
    self.color = color
class Horse(stat,loc,color):
  def __init__(self,stat,loc,color):
    self.loc = loc
    self.stat = stat
    self.color = color
class Pawn(stat,loc,color):
  def __init__(self,stat,loc,color):
    self.loc = loc
    self.stat = stat
    self.color = color
pieces = {
  'KingB': King(1,[6,0],1),
  'KingW': King(1,[6,8],1),
  'QueenB': Queen(1,[5,0],1),
  'QueenW': Queen(1,[5,8],1),
}
res = [50*board[0],50*board[1]]
screen = pygame.display.set_mode(res)
def drawb():
  screen.fill((0,0,0))
  x=0
  y=0
  i3=0
  colors=[(232,235,239),(125,135,150)]
  i4 = 0
  i5 = 0
  board2 = []
  row = []
  while i4 < board[0]:
    row = []
    i5 = 0
    while i5 < board[1]:
      row.append(0)
      i5 += 1
    board2.append(row)
    i4 += 1
  for i in board2[0]:
    for i2 in board2[1]:
      colori = 1
      if i3 % 2 == 0:
        colori = 0
      pygame.draw.rect(screen,colors[colori],(x,y,50,50))
      x += 50
      i3 += 1
    i3 += 1
    y += 50
    x = 0
  print('Board Drawn')
  pygame.display.flip()
def drawp():
  x = 0
  y = 0
  for i in pieces:

drawb()
while ext:
  for event in pygame.event.get():
    if event.type == pygame.QUIT:
      ext = False
pygame.exit()
sys.exit()