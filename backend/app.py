from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
import os


load_dotenv()

app = Flask(__name__)
CORS(app)

mongo_connection_string = os.getenv('MONGO_CONNECTION_STRING')
if not mongo_connection_string:
    raise ValueError("No MongoDB connection string found in environment variables")

client = MongoClient(mongo_connection_string)
db = client['Codher']

print("Connected to MongoDB")

@app.route('/')
def home():
    return "Brotatoes for the win!"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = db.users.find_one({"email": email, "password": password})

    if user:
        return jsonify({
            "status": "success",
            "role": user.get("role", "unknown")
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route('/addproduct', methods=['POST'])
def add_product():
    data = request.get_json()
    product_id = data.get('product_id')
    product_name = data.get('product_name')
    

    if not product_id or not product_name:
        return jsonify({"error": "All fields are required"}), 400

    product = {
        "product_id": product_id,
        "product_name": product_name
    }

    db.products.insert_one(product)
    return jsonify({"status": "success"}), 201

@app.route('/products', methods=['GET'])
def get_products():
    products = list(db.products.find({}, {'_id': 0}))
    if not products:
        return jsonify({"error": "No products found"}), 404
    return jsonify(products), 200



if __name__ == '__main__':
    app.config['DEBUG'] = False
    app.run(host='0.0.0.0', port=5000)