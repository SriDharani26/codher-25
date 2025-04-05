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
            "message": "Login successful",
            "role": user.get("role", "unknown")
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401



if __name__ == '__main__':
    app.config['DEBUG'] = False
    app.run(host='0.0.0.0', port=5000)