import joblib
import numpy as np
import os


BASE_PATH = "O:/STUDY MATERIALS/PROJECTS/Smart AgroConnect/backend/models/"

model = joblib.load(os.path.join(BASE_PATH, "crop_recommendation_model.pkl"))
scaler = joblib.load(os.path.join(BASE_PATH, "scaler.pkl"))
label_encoder = joblib.load(os.path.join(BASE_PATH, "label_encoder.pkl"))

def predict_crop(data):
    try:
        input_data = np.array([
            data["N"], data["P"], data["K"],
            data["temperature"], data["humidity"],
            data["ph"], data["rainfall"]
        ]).reshape(1, -1)

      
        scaled_input = scaler.transform(input_data)

        
        prediction = model.predict(scaled_input)

       
        predicted_crop = label_encoder.inverse_transform(prediction)[0]

        return str(predicted_crop)
    except Exception as e:
        return {"error": str(e)}
