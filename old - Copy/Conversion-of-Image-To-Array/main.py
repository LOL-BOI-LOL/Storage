from PIL import Image
import numpy as np
img = Image.open('no.png')
na = np.array(img)
#resultim = Image.fromarray(na)
#resultim.save('no2.png')
nea = []
ln = na[0].length()
for i in na:
  e = 0
  while e <= ln:
    nea.append([i[0][0]+i[1][0],i[0][1]+i[1][1],i[0][2]+i[1][2],255])
    e += 1
print(nea)