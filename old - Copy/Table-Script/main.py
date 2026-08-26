import tempfile
import requests
import urllib.request
from bs4 import BeautifulSoup
from PIL import Image

base_url = "https://prnt.sc/"
possible_characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3" ,"4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
image_urls = []

for char1 in ["a"]:
  for char2 in ["f"]:
    for char3 in ["j"]:
      for char4 in ["9"]:
        for char5 in ["f"]:
          for char6 in possible_characters:
            url = base_url + char1 + char2 + char3 + char4 + char5 + char6
            image_urls.append(BeautifulSoup(requests.get(url, headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0'}).text, "html.parser").find_all("img", class_ = "no-click screenshot-image")[0])

def generate_image(index):
  img = image_urls[index]

  try:
    image_data = requests.get(img["src"])
  except Exception as error:
    print("Error in Retrieving Image")
    print(error)
  else:
    try:
      temp_file = tempfile.NamedTemporaryFile();
      with open(temp_file.name, "wb") as f:
        f.write(image_data.content)
      Image.open(temp_file.name).show()
    except Exception as error:
      print("Error in Opening or Displaying Image")
      print(error)

print("Number of Images: " + str(len(image_urls)))

while True:
  generate_image(int(input("Index:")))