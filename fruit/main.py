# This is a sample Python script.
from fruit import connect_db, create_index_btree, test_query_index, create_index_hash, update_name, get_classes, \
    update_path

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    collection = connect_db()

    # Tạo index cho trường 'name' theo thứ tự tăng dần
    # create_index_btree(collection)

    # create_index_hash(collection)

    # test_query_index(collection)

    # update_name(collection)

    # get_classes(collection)

    # update_path(collection)
