for _ in range(int(input())):
  (dvd, dvs) = input().split()
  try:
    float(dvd)
  except:
    print("Invalid Dividend")
    continue
  try:
    float(dvs)
  except:
    print("Invalid Divisor")
    continue

  (dvd, dvs) = (float(dvd), float(dvs))
  if dvs == 0:
    print("Divide By Zero")
    continue
  print(round(dvd / dvs, 1))