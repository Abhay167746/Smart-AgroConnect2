from flask import Blueprint, request, jsonify #type: ignore
from prediction.predict import predict_crop

main_blueprint = Blueprint("main", __name__)

@main_blueprint.route("/")
def home():
    return jsonify({"message": "Smart AgroConnect API is running!"})

@main_blueprint.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    try:
        prediction = predict_crop(data)
        return jsonify({"prediction": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
