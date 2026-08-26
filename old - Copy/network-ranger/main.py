num_test_cases = int(input())

for test_case in range(num_test_cases):
  firstAddress = []
  addresses = []
  
  for i in range(int(input())):
    addresses.append(list(map(lambda x: int(x), input().split("."))))  
    string = ""
    for num in addresses[i]:
      temp = bin(num)[2:]
      while len(temp) < 8:
        temp = "0" + temp;
      if i == 0:
        firstAddress.append(temp)
      string += temp
    addresses[i] = string
    
  addresses = list(zip(*addresses))
  count = 0
  while count < len(addresses) and all(val == addresses[count][0] for val in addresses[count]):
    count += 1
    
  string = ""
  for i in range(int(count / 8)):
    string += str(int(firstAddress[i], 2))
    if i != 3:
      string += "."
  if count != 32:
    temp = firstAddress[3 - int((31 - count) / 8)][0:count % 8]
    while len(temp) < 8:
      temp += "0"
    string += str(int(temp, 2))
    
  for i in range(3 - int(count / 8)):
    string += ".0"
    
  print(string + "/" + str(count))