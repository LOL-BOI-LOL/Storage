import pygame
import sys
import time
pygame.init()
exit = False
screen = pygame.display.set_mode((100,100))
rectList = []
k = None
class rectObj():
  def __init__(self,x,y,w,h,rgb):
    rectList.append([(rgb),pygame.Rect((x,y),(w,h))])
class playerObj():
  def __init__(self,x,y,w,h,rgb):
    rectList.append([(rgb),pygame.Rect((x,y),(w,h))])
    self.x = x
    self.y = y
  def w(self):
    self.y -= 1
    update()
  def s(self):
    self.y += 1
    update()
  def a(self):
    self.x -= 1
    update()
  def d(self):
    self.x += 1
    update()
def update():
  
  screen.fill((0,0,0))
  for i in rectList:
    pygame.draw.rect(screen,i[0],i[1])
  pygame.display.update()
def quit():
  global exit
  exit = True
  pygame.quit()
  sys.exit()
p = playerObj(0,0,50,50,(255,255,255))
keys = {
  pygame.K_ESCAPE: quit,
  pygame.K_w: p.w,
  pygame.K_s: p.s,
  pygame.K_a: p.a,
  pygame.K_d: p.d
}
update()
while not exit:
  for event in pygame.event.get():
    if event.type == pygame.QUIT:
      quit()
    elif event.type == pygame.KEYDOWN:
      k = event.key
      keys.get(event.key,update)()
    elif event.type == pygame.TEXTINPUT:
      keys.get(k,update)()
  time.sleep(0.01)