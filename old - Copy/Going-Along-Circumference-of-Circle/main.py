import sys
import pygame
import math
pygame.init()
res = (300,300)
screen = pygame.display.set_mode(res)
ext = False
clock = pygame.time.Clock()
r = 100
xy = [150, 150]
deg = 0
def quit():
  global ext
  ext = True
  sys.exit()
def move():
  global deg
  coords = [r*math.cos(math.radians(deg))+xy[0], r*math.sin(math.radians(deg))+xy[1]]
  screen.fill((0,0,0))
  pygame.draw.circle(screen, (255,255,255), coords, 10, 10)
  deg += 1
  if deg >= 360:
    deg = 0
  pygame.display.flip()
while not ext:
  for event in pygame.event.get():
    if event.type == pygame.QUIT:
      quit()
  move()
  clock.tick(360)