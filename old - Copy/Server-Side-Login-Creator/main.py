import random
import json
username = input('Name: ')
password = input('Passsword: ')
random.seed()
identifier = int(random.random()*(10e+9))
with open('info.json','r+') as file:
  currentfile = json.loads(file.read())
  try:
    currentfile[username]
  except:
    currentfile[username] = username[password] = identifier
    file.append(json.stringfy(currentfile))