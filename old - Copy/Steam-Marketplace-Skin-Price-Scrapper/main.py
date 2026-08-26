import requests
import json
import re
import time
import random

def update_prices():
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
      (name, wear) = listing["name"].split(" (")
      wear = wear[:-1]

      if name not in item_listings:
        item_listings[name] = {}

      item_listings[name][wear] = round(listing["sell_price"] / 100, 2)

    url = re.sub(r"start=\d+", "start=" + str((i + 1) * 100), url)

  with open("item_listings.json", "w") as file:
    json.dump(item_listings, file, indent = 4)

def update_prices_industrial():
  url = "https://steamcommunity.com/market/search/render/?query=&start=0&count=100&search_descriptions=0&sort_column=popular&sort_dir=desc&appid=730&category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=any&category_730_Tournament%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Type%5B%5D=any&category_730_Weapon%5B%5D=any&category_730_Quality%5B%5D=tag_normal&category_730_Rarity%5B%5D=tag_Rarity_Uncommon_Weapon&norender=1"
  item_listings = {}
  stop = False

  for i in range(0, 7):
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
      (name, wear) = listing["name"].split(" (")
      wear = wear[:-1]

      if name not in item_listings:
        item_listings[name] = {}

      item_listings[name][wear] = round(listing["sell_price"] / 100, 2)

    url = re.sub(r"start=\d+", "start=" + str((i + 1) * 100), url)

  with open("item_listings_industrial.json", "w") as file:
    json.dump(item_listings, file, indent = 4)

def calc_averages():
  with open("skin_floats.json", "r") as file:
    contents = json.loads(file.read())

  new_dict = {}

  for name, range in contents.items():
    new_dict[name] = {"min": range[0], "max": range[1]}

    if range[0] < .07:
      new_dict[name]["average_fn"] = round((range[0] + min(range[1], .07)) / 2, 8)
    else:
      new_dict[name]["average_fn"] = None

    if range[0] < .15 and range[1] > .07:
      new_dict[name]["average_mm"] = round((max(range[0], .07) + min(range[1], .15)) / 2, 8)
    else:
      new_dict[name]["average_mm"] = None

    if range[0] < .38 and range[1] > .15:
      new_dict[name]["average_ft"] = round((max(range[0], .15) + min(range[1], .38)) / 2, 8)
    else:
      new_dict[name]["average_ft"] = None

    if range[0] < .45 and range[1] > .38:
      new_dict[name]["average_ww"] = round((max(range[0], .38) + min(range[1], .45)) / 2, 8)
    else:
      new_dict[name]["average_ww"] = None

    if range[1] > .45:
      new_dict[name]["average_bs"] = round((max(range[0], .45) + range[1]) / 2, 8)
    else:
      new_dict[name]["average_bs"] = None

  with open("skin_floats.json", "w") as file:
    json.dump(new_dict, file, indent = 4)

with open("collection_list.json", "r") as file:
  contents = json.load(file)

with open("item_listings_industrial.json", "r") as file:
  industrial_skins_prices = json.load(file)
industrial_skins_available = list(industrial_skins_prices.keys())

with open("item_listings.json", "r") as file:
  consumer_skins_prices = json.load(file)
consumer_skins_available = list(consumer_skins_prices.keys())

consumer_grade_skins = {}

for collection, skins in contents.items():
  consumer_temp = []
  industrial_temp = []
  skip = False

  for skin, quality in skins.items():
    if quality == "Consumer Grade":
      if skin in consumer_skins_available:
        consumer_temp.append(skin)
    else:
      if skin not in industrial_skins_available:
        skip = True
        break
      industrial_temp.append(skin)

  if skip:
    continue

  for consumer_skin in consumer_temp:
    consumer_grade_skins[consumer_skin] = industrial_temp

for skin, data in consumer_grade_skins.items():
  consumer_grade_skins[skin] = {
    "outcomes": data,
    "prices": consumer_skins_prices[skin]
  }

random_skins = list(map(lambda _: random.choice(list(consumer_grade_skins.keys())), [None] * 10))
qualities = ["Factory New", "Minimal Wear", "Field-Tested", "Well-Worn", "Battle-Scarred"]
quality = random.choice(qualities)
while True:
  cont = False
  
  for skin in random_skins:
    if quality not in consumer_grade_skins[skin]["prices"].keys():
      qualities.remove(quality)
      quality = random.choice(qualities)
      cont = True

  if not cont:
    break

with open("skin_floats.json", "r") as file:
  skin_floats = json.load(file)

random_skin_info = list(map(lambda skin: {"name": skin, "price": consumer_grade_skins[skin]["prices"][quality], "averge_float": skin_floats[skin]["average_" + quality]}, random_skins))
all_possible = []
unique_possible = {}

for skin_info in random_skin_info:
  all_possible += consumer_grade_skins[skin_info["name"]]["outcomes"]
  for outcome in consumer_grade_skins[skin_info["name"]]["outcomes"]:
    unique_possible[outcome] = 0

for outcome in unique_possible.keys():
  unique_possible[outcome] = round(all_possible.count(outcome) / len(all_possible) * 100, 3)

print(unique_possible)