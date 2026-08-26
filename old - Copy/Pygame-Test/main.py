import sys
import pygame
pygame.init()
res = [300,300]
screen = pygame.display.set_mode(res)
ext = False
pos = [0,0]
bgcolor = [0,0,0]
plysp = 0.2
mpos = [0,0]
font2 = pygame.font.SysFont(None,30)
sentence = font2.render('dis is sentence', True, (255,255,255),(0,255,0))
clock = pygame.time.Clock()
k = None
def detectkey(key):
  if not keys.get(key) == None:
    keys.get(key)()
def w():
  global pos
  if pos[1] > 0 and ddp:
    pos[1] -= plysp*dt
def s():
  global pos
  if pos[1] + 50  < res[1] and ddp:
    pos[1] += plysp*dt
def a():
  global pos
  if pos[0] > 0 and ddp:
    pos[0] -= plysp*dt
def d():
  global pos
  if pos[0] + 50 < res[0] and ddp:
    pos[0] += plysp*dt
def quit():
  global ext
  if ddp:
    ext = True
    sys.exit()
def draw():
  screen.fill(bgcolor)
  screen.blit(sentence,[100,100])
  pygame.draw.rect(screen,[255,0,0],[[mpos[0]-25,mpos[1]-25],[50,50]],1)
  pygame.draw.rect(screen,[255,255,255],[pos,[50,50]])
  pygame.draw.circle(screen,[255,255,255],[200,200],25)
  pygame.display.update()
ddp = False
keys = {
  pygame.K_ESCAPE: quit,
  pygame.K_w: w,
  pygame.K_s: s,
  pygame.K_a: a,
  pygame.K_d: d
}
ddp = True
while not ext:
  dt = clock.tick(120)
  for event in pygame.event.get():
    mpos = pygame.mouse.get_pos()
    if event.type == pygame.QUIT:
      quit()
    elif event.type == pygame.KEYDOWN:
      k = event.key
      detectkey(event.key)
    elif event.type == pygame.TEXTINPUT:
      detectkey(k)
  draw()
  clock.tick()