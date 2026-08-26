import os
import datetime
clear = lambda: os.system('clear')
user = None
menu = True
def login():
  global user, menu
  clear()
  name = input('Enter Name: ')
  if name == 'Exit':
    clear()
    menu = True
    return
  with open('logininfo.txt','r') as f:
    names = f.read().split("\n")
    for i in names:
      if i == name:
        user = i
        clear()
        print('Logged In As '+user)
        menuf()
    if user == None:
      print('Invalid')
      login()
def enterchat():
  try:
    loadchat(input('Enter Room Number: '))
  except:
    print('Invalid')
    enterchat()
    return
def loadchat(x):
  clear()
  print('Entering Room '+str(x))
  clear()
  with open('room'+str(x)+'.txt','r') as f:
    messages = f.read().split("\n")
  for i in messages:
    print(i)
  nmessage(x)
def exit():
  global menu
  clear()
  menu = True
def nmessage(x):
  y = input()
  if y == 'Exit':
    exit()
  else:
    with open('room'+str(x)+'.txt','a') as f:
      f.write('\n'+y+'\n'+user+'\n'+str(datetime.datetime.now()))
    loadchat(x)
def menuf():
  print('(For Help Type Help)\nWhat Would You Like To Do?')
  answer = input()
  if answer == 'Help':
    clear()
    print('Login: Bring You To Login Page\nEnter: Bring You To Chat')
    menuf()
    return
  elif answer == 'Login':
    login()
  elif answer == 'Enter' and not user == None:
    clear()
    enterchat()
  elif answer == 'Enter' and user == None:
    clear()
    print('Please Login To Enter')
    menuf()
  else:
    clear()
    print('Invalid')
    menuf()
while True:
  if menu == True:
    menu = False
    menuf()