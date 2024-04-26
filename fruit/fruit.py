from pymongo import MongoClient


# Kết nối tới MongoDB
def connect_db():
    client = MongoClient('mongodb+srv://root:zGPbGj3rFTlN6ecj@cluster0.d0k6vjo.mongodb.net/test')

    # Chọn database và collection
    db = client['master']
    collection = db['fruit_btree']
    return collection


def create_index_btree(collection):
    # Create index for 'name' field in ascending order
    # With MongoDB, default index type is B-tree
    collection.create_index([('name', 1)])


def test_query_index(collection):
    query = collection.find({'name': 'apple'}).explain()
    print(query.get('executionStats', {}))


def create_index_hash(collection):
    # Create index for 'name' field using hash
    collection.create_index([('name', 'hashed')])


def update_name(collection):
    # Duyệt qua tất cả các documents trong collection
    for doc in collection.find():
        # Kiểm tra xem document có trường "name" và có chứa "_" không
        if "name" in doc and "_" in doc["name"]:
            # Tạo tên mới cho trường "name" bằng cách loại bỏ "_"
            new_name = doc["name"].replace("_", " ")
            # Cập nhật giá trị mới cho trường "name" trong document
            collection.update_one({'_id': doc['_id']}, {'$set': {"name": new_name}})


def get_classes(collection):
    # Lấy danh sách các giá trị duy nhất cho trường "name"
    unique_names = collection.distinct("name")

    # Đếm số lượng tên khác nhau
    number_of_unique_names = len(unique_names)

    print(f"Có {number_of_unique_names} tên khác nhau trong collection.")
    print("Danh sách các tên duy nhất:")
    for name in unique_names:
        print(name)


def update_path(collection):
    for doc in collection.find():
        if "path" in doc:
            new_path = doc["path"].replace("/content/drive/MyDrive/Master/HTTT Đa phương tiện/test", "")
            # Cập nhật giá trị mới cho trường "name" trong document
            collection.update_one({'_id': doc['_id']}, {'$set': {"path": new_path}})

