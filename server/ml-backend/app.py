from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
import tensorflow as tf

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Load your trained model
try:
    model = tf.keras.models.load_model("leaf_disease_model.h5")
    class_names = ["Apple Scab", "Apple Rust", "Corn Blight", "Healthy", "Tomato Bacterial Spot"]
    model_loaded = True
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    class_names = []
    model_loaded = False

def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

@app.route('/api/detect-disease', methods=['POST', 'OPTIONS'])
def detect_disease():
    if request.method == 'OPTIONS':
        return add_cors_headers(make_response('', 200))
    
    if not model_loaded:
        return add_cors_headers(jsonify({'error': 'Model not loaded'})), 500
    
    if 'leaf' not in request.files:
        return add_cors_headers(jsonify({'error': 'No leaf image uploaded'})), 400
    
    try:
        file = request.files['leaf']
        img = Image.open(file.stream).resize((224, 224))
        img_array = np.expand_dims(np.array(img)/255.0, axis=0)
        predictions = model.predict(img_array)
        class_index = np.argmax(predictions)
        confidence = round(100 * np.max(predictions), 2)

        return add_cors_headers(jsonify({
            "disease": class_names[class_index],
            "confidence": confidence
        }))
    except Exception as e:
        import traceback
        print(f"Error in disease detection: {e}")
        traceback.print_exc()
        return add_cors_headers(jsonify({'error': f'Error processing image: {str(e)}'})), 500

@app.route('/api/detect-soil', methods=['POST', 'OPTIONS'])
def detect_soil():
    if request.method == 'OPTIONS':
        return add_cors_headers(make_response('', 200))
    if 'image' not in request.files:
        return add_cors_headers(jsonify({'error': 'No image uploaded'})), 400
    image = request.files['image']
    soil_type = "Loamy"
    return add_cors_headers(jsonify({'soil_type': soil_type}))

@app.route('/api/recommend-plants', methods=['POST', 'OPTIONS'])
def recommend_plants():
    if request.method == 'OPTIONS':
        return add_cors_headers(make_response('', 200))
    try:
        data = request.get_json(force=True, silent=True) or {}
        soil_type = data.get('soil_type') or 'Loamy'
        location = data.get('location', '')
        temperature = data.get('temperature')
        try:
            temperature = int(temperature)
        except (TypeError, ValueError):
            temperature = 25
        plant_map = {
            "Sandy": [("Carrot", (15, 25)), ("Potato", (15, 20)), ("Peanut", (20, 30))],
            "Clay": [("Rice", (20, 30)), ("Broccoli", (15, 25)), ("Cabbage", (15, 20))],
            "Silty": [("Tomato", (20, 30)), ("Pea", (13, 18)), ("Soybean", (20, 30))],
            "Peaty": [("Cranberry", (10, 20)), ("Blueberry", (13, 21))],
            "Chalky": [("Spinach", (10, 20)), ("Beetroot", (15, 25))],
            "Loamy": [("Wheat", (12, 25)), ("Maize", (18, 27)), ("Sugarcane", (20, 30))],
            "Red Soil": [("Millet", (20, 30)), ("Groundnut", (20, 30)), ("Cotton", (21, 30))],
            "Black Soil": [("Cotton", (21, 30)), ("Sorghum", (20, 30)), ("Soybean", (20, 30))],
            "Alluvial Soil": [("Paddy", (20, 30)), ("Sugarcane", (20, 30)), ("Jute", (24, 35))],
            "Laterite Soil": [("Cashew", (20, 30)), ("Pineapple", (20, 30)), ("Tea", (18, 25))],
            "Saline Soil": [("Barley", (12, 25)), ("Cotton", (21, 30))],
            "Alkaline Soil": [("Rice", (20, 30)), ("Wheat", (12, 25))],
            "Coastal Alluvium": [("Coconut", (20, 30)), ("Paddy", (20, 30))],
            "Deltaic Alluvium": [("Paddy", (20, 30)), ("Banana", (20, 30))],
            "Mixed Red and Black Soil": [("Cotton", (21, 30)), ("Groundnut", (20, 30))],
            "Forest Soil": [("Tea", (18, 25)), ("Coffee", (15, 25))],
            "Calcareous Soil": [("Sugarcane", (20, 30)), ("Wheat", (12, 25))],
        }
        recommendations = []
        if soil_type in plant_map and temperature is not None:
            for plant, (t_min, t_max) in plant_map[soil_type]:
                if t_min <= temperature <= t_max:
                    recommendations.append(plant)
            if not recommendations:
                recommendations = [f"No suitable plant found for {soil_type} at {temperature}°C"]
        else:
            recommendations = ["No recommendation found"]
        return add_cors_headers(jsonify({'recommendations': recommendations}))
    except Exception as e:
        print("Error in recommend_plants:", e)
        return add_cors_headers(jsonify({'recommendations': ["No recommendation found (error)"]})), 200

if __name__ == '__main__':
    app.run(port=5000, debug=False)
