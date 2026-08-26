import requests
import json
import re
import time

url = "https://steamcommunity.com/market/search/render/?query=&start=0&count=100&search_descriptions=0&sort_column=name&sort_dir=asc&appid=730&category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=any&category_730_Tournament%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Type%5B%5D=any&category_730_Weapon%5B%5D=any&category_730_Quality%5B%5D=tag_normal&category_730_Rarity%5B%5D=tag_Rarity_Common_Weapon&norender=1"
item_listings = {}
stop = False

for i in range(0, 8):
  for attempt in range(0, 5):
    strt = time.time()
    response = requests.get(url)
    print("Reponse recieved in " + str(time.time() - strt))
    
    data = json.loads(response.content.decode("utf-8"))["results"]
    
    if len(data) == 0:
      print("Results is empty")
      
      if attempt == 4:
        print("Failed to get results after 5 attempts")
        stop = True
        break

      time.sleep(15)
      continue
    else:
      break

  if stop:
    break
  
  for listing in data:
    full_name = listing["name"]
    item_listings[full_name.split(" (")[0]] = {
      "wear": full_name.split(" (")[1][:-1],
      "price": round(listing["sell_price"] / 100, 2)
    }

  url = re.sub(r"start=\d+", "start=" + str((i + 1) * 100), url)

with open("item_listings.json", "w") as file:
  json.dump(item_listings, file, indent = 4)