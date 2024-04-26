from tensorflow.keras.preprocessing import image
import numpy as np
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from sklearn.decomposition import PCA
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.inception_v3 import InceptionV3, preprocess_input
import numpy as np
from io import BytesIO
import base64
import joblib
import logging

app = Flask(__name__)
CORS(app)

# Load MongoDB connection
client = MongoClient('mongodb+srv://root:zGPbGj3rFTlN6ecj@cluster0.d0k6vjo.mongodb.net/test')

db = client['master']
collection = db['fruit_v2']

# Load InceptionV3 model from local storage
model_path = 'src/inception_v3_model.h5'
model = load_model(model_path)

# # Initialize PCA for dimensionality reduction
# pca = PCA(n_components=50)

# Thay thế 'path/to/your/pca_model.pkl' bằng đường dẫn thực tế tới mô hình PCA của bạn
pca_model_path = 'src/pca.pkl'
pca = joblib.load(pca_model_path)


# Function to preprocess and extract features from an image
# Function to preprocess and extract features from an image
def extract_features_from_image(img_data):
    img = image.load_img(BytesIO(img_data), target_size=(299, 299))
    img_array = image.img_to_array(img)
    img_array_expanded_dims = np.expand_dims(img_array, axis=0)
    img_preprocessed = preprocess_input(img_array_expanded_dims)
    features = model.predict(img_preprocessed)
    flattened_features = features.flatten()
    return flattened_features


# Function to reduce dimensionality using PCA
def reduce_dimensionality(features):
    # Đảm bảo rằng `features` là một mảng numpy có hình dạng (1, 2048) hoặc tương tự,
    # tùy thuộc vào kích thước đầu ra của model InceptionV3 bạn đang sử dụng
    reduced_features = pca.transform([features])
    return reduced_features


# Function to calculate Euclidean distance between two vectors
def euclidean_distance(vector1, vector2):
    return np.linalg.norm(vector1 - vector2)


# Function to search for fruits in the database based on features with a given threshold
def search_fruits(features, threshold=0.5):
    matched_fruits = []
    for fruit in collection.find():
        db_features = np.array(fruit['features'])
        distance = euclidean_distance(features, db_features)
        if distance < threshold:
            matched_fruits.append(fruit)
    return matched_fruits


# API endpoint to search for fruits
@app.route('/search_fruits', methods=['POST'])
def search_fruits_api():
    try:
        # Decode base64 image
        img_data = request.json['image_data']
        if img_data.startswith('data:image/jpeg;base64,'):
            img_data = img_data.replace('data:image/jpeg;base64,', '')
        elif img_data.startswith('data:image/png;base64,'):
            img_data = img_data.replace('data:image/png;base64,', '')
        img_data = base64.b64decode(img_data)
        print('Image decoded successfully')

        features = extract_features_from_image(img_data)
        print(f'Extracted features, dimension before reduction: {features.shape}')

        reduced_features = reduce_dimensionality(features)
        print(f'Dimension after PCA reduction: {reduced_features.shape}')

        # Sử dụng `reduced_features` để tìm kiếm trong database
        result = search_fruits(reduced_features, threshold=0.1)

        return jsonify({'result': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
