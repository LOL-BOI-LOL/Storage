import sys
import pygame
pygame.init()
exit = 0
clock = pygame.time.Clock()
screen = pygame.display.set_mode([100, 100])
screen.fill((255, 255, 255))
pygame.display.flip()

player_pos = [0, 0];

def draw():
  pygame.draw.rect(screen, (0,0,0), player_pos, [10, 10])

draw()

while not exit:
  for event in pygame.event.get():
    if event.type == pygame.QUIT:
      exit = 1
      pygame.quit()
      sys.exit()
    if event.type == pygame.KEYDOWN:
      if event.key == pygame.k_W:
        player_pos[1] += 1
  clock.tick(30)

pygame.quit()
sys.exit()