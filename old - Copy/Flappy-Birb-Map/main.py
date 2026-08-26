import random
import time
import os
from replit import clear

def gen_pipe(width, hole_height, hole_size):
  #width >= 3 (start at 1)
  #hole_height >= 2 (start at 0)
  #hole_size >= 2 (start at 1)
  columns = []

  for column in range(width):
    for i in range(hole_height - 1):
      if column == 0 or column == width - 1:
        if len(columns) == game_height:
          columns[i].append("|")
        else:
          columns.append(["|"])
      else:
        columns[i].append(" ")

    if column == 0:
      columns.append(["-"])
    else:
      columns[hole_height - 1].append("-")

    for i in range(hole_height, hole_height + hole_size):
      if column == 0:
        columns.append([" "])
      else:
        columns[i].append(" ")

    if column == 0:
      columns.append(["-"])
    else:
      columns[hole_height + hole_size].append("-")

    for i in range(hole_height + hole_size + 1, game_height):
      if column == 0 or column == width - 1:
        if len(columns) == game_height:
          columns[i].append("|")
        else:
          columns.append(["|"])
      else:
        columns[i].append(" ")

  return columns

def remove_column(strt, end):
  #exclusive

  for _ in range(strt, end):
    for i in range(len(display)):
      display[i].pop(strt)

def gen_map(target_length):
  while len(display[0]) < target_length:
    if random.randint(1,3) == 1 and len(display[0]) > 10 and len(display[0]) <= target_length - 5 and all(val != "|" for val in display[0][len(display[0]) - 8:]):
      pipe = gen_pipe(random.randint(5, min(10, target_length - len(display[0]))), random.randint(2, max(2, game_height - 7)), 3)
      
      for i, row in enumerate(pipe):
        for val in row:
          display[i].append(val)
    
    else:
      for i in range(game_height):
        display[i].append(" ")

def print_map():
  clear()
  print("-" * game_width)
  print("\n".join(list(map(lambda row: "".join(row[:game_width]), display))))
  print("-" * game_width)

def run_game():
  while True:
    if len(display[0]) <= reload_at:
      gen_map(game_map_width)
    print_map()
  
    time.sleep(.2)
    remove_column(0, 1)
  
game_height = 15
game_width = os.get_terminal_size().columns
game_map_width = game_width * 3
reload_at = game_map_width - 100
display = []
for _ in range(game_height):
  display.append([" "])

run_game()