def merge(arr1, arr2):
  temp = []
  while len(arr1) + len(arr2) > 0:
    if len(arr1) > 0 and (len(arr2) == 0 or arr1[0] < arr2[0]):
      temp.append(arr1[0])
      arr1.pop(0)
    else:
      temp.append(arr2[0])
      arr2.pop(0)
  return temp

def mergeSort(arr):
  if len(arr) == 1:
    return arr
  middle = len(arr) // 2
  return merge(mergeSort(arr[:middle]), mergeSort(arr[middle:]))

print(mergeSort(list(map(float, input().split(",")))))