import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const CropPrediction = () => {
  const [inputs, setInputs] = useState({
    N: 90,
    P: 40,
    K: 40,
    temperature: 25,
    humidity: 60,
    ph: 6.5,
    rainfall: 200,
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    const { N, P, K, temperature, humidity, ph, rainfall } = inputs;
    const valid =
      !isNaN(N) &&
      !isNaN(P) &&
      !isNaN(K) &&
      !isNaN(temperature) &&
      !isNaN(humidity) &&
      !isNaN(ph) &&
      !isNaN(rainfall);

    return valid;
  };

  const handlePredict = async () => {
    if (!validateInputs()) {
      toast.error("Please enter valid numerical values in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        inputs
      );
      let pred = response.data.prediction;
      setPrediction(pred.toUpperCase());
    } catch (error) {
      toast.error("Failed to fetch prediction.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Crop Prediction Tool 🌾
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { name: "N", label: "Nitrogen (mg/kg)" },
            { name: "P", label: "Phosphorous (mg/kg)" },
            { name: "K", label: "Potassium (mg/kg)" },
            { name: "temperature", label: "Temperature (°C)" },
            { name: "humidity", label: "Humidity (%)" },
            { name: "ph", label: "Soil pH" },
            { name: "rainfall", label: "Rainfall (mm)" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type="number"
                step="any"
                name={field.name}
                value={inputs[field.name]}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handlePredict}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all"
        >
          Predict
        </button>

        {loading && (
          <div className="flex justify-center mt-6">
            <ClipLoader color="#10B981" size={40} />
          </div>
        )}

        {prediction && !loading && (
          <div className="mt-6 text-center text-xl font-semibold text-green-700">
            Recommended Crop: 🌱 {prediction}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPrediction;
