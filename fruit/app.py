from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb+srv://root:zGPbGj3rFTlN6ecj@cluster0.d0k6vjo.mongodb.net/test')

db = client['master']
collection = db['fruit_hashed']


def find_fruits_in_text(text):

    fruit_keywords = [
        "acorn",
        "acorn squash",
        "agaric",
        "anemone fish",
        "artichoke",
        "bagel",
        "banana",
        "bell pepper",
        "black grouse",
        "bloodhound",
        "bolete",
        "broccoli",
        "cabbage butterfly",
        "cantaloupe",
        "cauliflower",
        "chambered nautilus",
        "chiton",
        "cucumber",
        "custard apple",
        "daisy",
        "eggplant",
        "fig",
        "ginger",
        "grape",
        "guacamole",
        "gyromitra",
        "hartebeest",
        "head cabbage",
        "jackfruit",
        "lemon",
        "lettuce",
        "mango",
        "meat loaf",
        "mushroom",
        "orange",
        "papaya",
        "pear",
        "pineapple",
        "pomegranate",
        "pumpkin",
        "radish",
        "raspberry",
        "red wine",
        "shallot",
        "spaghetti squash",
        "strawberry",
        "tomato",
        "truffle",
        "watermelon",
        "zucchini"
    ]

    found_fruits = []
    input_words = text.lower().split()
    input_words = [word.strip(",.") for word in input_words]
    input_words = list(set(input_words))
    input_words = [word for word in input_words if len(word) > 1]

    for keyword in fruit_keywords:
        for word in input_words:
            if word in keyword.lower():
                found_fruits.append(keyword)
                break

    found_fruits = list(set(found_fruits))
    return found_fruits


# @app.route('/search_fruits', methods=['GET'])
# def search_fruits():
#     input_text = request.args.get('input_text', '')
#     found_keywords = find_fruits_in_text(input_text)
#     fruits_result = []
#
#     for keyword in found_keywords:
#         fruits = collection.find({"name": {"$regex": keyword, "$options": "i"}})
#         for fruit in fruits:
#             fruits_result.append({"name": fruit['name'], "path": fruit.get('path', 'No image')})
#
#     return jsonify(fruits_result)


@app.route('/search_fruits', methods=['GET'])
def search_fruits():
    input_text = request.args.get('input_text', '')
    found_keywords = find_fruits_in_text(input_text)
    fruits_result = []

    for keyword in found_keywords:
        query = collection.find({"name": {"$regex": keyword, "$options": "i"}}).explain()

        execution_time = query.get('executionStats', {}).get('executionTimeMillis', int)
        print("ExecutionStats: ", query.get('executionStats', {}))
        print("Execution time: ", execution_time)

        fruits = collection.find({"name": {"$regex": keyword, "$options": "i"}})
        for fruit in fruits:
            fruit_result = {
                "name": fruit['name'],
                "path": fruit.get('path', 'No image')
            }
            fruits_result.append(fruit_result)

        response = {
            "fruits": fruits_result,
            "query_duration": execution_time
        }

        return jsonify(response)

    return jsonify({"fruits": fruits_result, "query_duration": 0})


if __name__ == '__main__':
    app.run(debug=True)
