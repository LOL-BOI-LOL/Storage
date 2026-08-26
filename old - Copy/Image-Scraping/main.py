import tempfile
import requests
import urllib.request
from bs4 import BeautifulSoup
from PIL import Image

url = "https://commons.wikimedia.org/w/index.php?search=dog&title=Special:MediaSearch&go=Go&type=image&assessment=quality-image"

images = list(filter(lambda x: x["src"].startswith("https://"), BeautifulSoup(requests.get(url).text, "html.parser").find_all("img")))
print("Number of Images: " + str(len(images)))

def generate_image(image_index):
  img = images[image_index]

  try:
    img_path = urllib.request.urlretrieve(img["src"])[0]
  except Exception as error:
    print("Error in Retrieving Image")
    print(error)
  else:
    try:
      image = Image.open(img_path)
      px = image.load();
      rgb = px[int(image.size[0] / 2), int(image.size[1] / 2)]
      print((rgb[0] / 255) * (rgb[1] / 255) * (rgb[2] / 255))
      image.show()
    except Exception as error:
      print("Error in Opening or Displaying Image")
      print(error)

while True:
  generate_image(int(input("Index:")))