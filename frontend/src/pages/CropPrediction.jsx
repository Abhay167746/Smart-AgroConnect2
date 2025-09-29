import axios from "axios";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const SENSOR_PRESET = {
  N: 85,
  P: 38,
  K: 36,
  temperature: 27,
  humidity: 62,
  ph: 6.6,
  rainfall: 180,
};

const DEFAULTS = {
  N: 90,
  P: 40,
  K: 40,
  temperature: 25,
  humidity: 60,
  ph: 6.5,
  rainfall: 200,
};

export default function CropPrediction() {
  const [mode, setMode] = useState("manual"); // 'manual' | 'sensors'
  const [inputs, setInputs] = useState(DEFAULTS);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null); // {crop, confidence, alternatives: [{crop, score}]}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    const { N, P, K, temperature, humidity, ph, rainfall } = inputs;
    const nums = [N, P, K, temperature, humidity, ph, rainfall];
    return nums.every((n) => n !== "" && !isNaN(Number(n)));
  };

  const handlePredict = async () => {
    if (!validateInputs()) {
      toast.error("Please enter valid numerical values in all fields.");
      return;
    }
    setLoading(true);
    setPrediction(null);
    try {
      const payload = {
        ...inputs,
        N: Number(inputs.N),
        P: Number(inputs.P),
        K: Number(inputs.K),
        temperature: Number(inputs.temperature),
        humidity: Number(inputs.humidity),
        ph: Number(inputs.ph),
        rainfall: Number(inputs.rainfall),
      };
      const response = await axios.post(
        "http://localhost:5000/predict",
        payload
      );
      const pred = String(response.data.prediction || "").toUpperCase();

      // Mock confidence and alternatives for now (server can supply later)
      const confidence = 0.86;
      const alternatives = [
        { crop: "MAIZE", score: 0.81 },
        { crop: "SUGARCANE", score: 0.77 },
        { crop: "SOYBEAN", score: 0.74 },
      ];
      setPrediction({ crop: pred, confidence, alternatives });
    } catch (err) {
      toast.error("Failed to fetch prediction.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUseSensors = () => {
    setMode("sensors");
    setInputs(SENSOR_PRESET);
  };

  const handleUseManual = () => {
    setMode("manual");
    setInputs(DEFAULTS);
  };

  const Field = ({ name, label, step = "any" }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        step={step}
        name={name}
        value={inputs[name]}
        onChange={handleChange}
        className="mt-1 p-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-700 tracking-tight">
              AI Crop Recommendation
            </h1>
            <p className="text-gray-600 mt-1">
              Get the best crop suggestion based on soil and climate parameters.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUseManual}
              className={`px-4 py-2 rounded-lg border transition ${
                mode === "manual"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300"
              }`}
              aria-pressed={mode === "manual"}
            >
              Enter Manually
            </button>
            <button
              onClick={handleUseSensors}
              className={`px-4 py-2 rounded-lg border transition ${
                mode === "sensors"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300"
              }`}
              aria-pressed={mode === "sensors"}
            >
              Use Sensors
            </button>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Inputs or Sensors snapshot */}
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 ring-1 ring-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {mode === "manual" ? "Enter Inputs" : "Sensor Snapshot"}
              </h2>
              <span className="text-xs text-gray-500">
                {mode === "manual"
                  ? "Default averages prefilled"
                  : "Hardcoded sensor values"}
              </span>
            </div>

            {mode === "manual" ? (
              <div className="grid grid-cols-2 gap-4">
                <Field name="N" label="Nitrogen (mg/kg)" />
                <Field name="P" label="Phosphorus (mg/kg)" />
                <Field name="K" label="Potassium (mg/kg)" />
                <Field name="temperature" label="Temperature (°C)" />
                <Field name="humidity" label="Humidity (%)" />
                <Field name="ph" label="Soil pH" step="0.1" />
                <Field name="rainfall" label="Rainfall (mm)" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(inputs).map(([k, v]) => (
                  <div
                    key={k}
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-100"
                  >
                    <div className="text-xs uppercase tracking-wide text-emerald-600">
                      {k}
                    </div>
                    <div className="text-2xl font-semibold text-emerald-900 mt-1">
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handlePredict}
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <ClipLoader color="#ffffff" size={20} />
                  <span>Predicting...</span>
                </>
              ) : (
                <span>Predict</span>
              )}
            </button>

            <p className="text-xs text-gray-500 mt-3">
              Data will be fetched from live sensors in the final build. Manual
              mode supports precise overrides.
            </p>
          </div>

          {/* Right: Illustration and tips */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-green-500 text-white shadow-xl">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, #fff, transparent 30%), radial-gradient(circle at 80% 0%, #fff, transparent 25%)",
              }}
            />
            <div className="relative p-6">
              <h3 className="text-2xl font-bold">Smart AgroConnect AI</h3>
              <p className="text-emerald-50 mt-1">
                Powered by soil chemistry and climate analytics to maximize
                yield.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  {
                    title: "N-P-K",
                    desc: "Soil nutrients calibrated for crop needs",
                  },
                  {
                    title: "Climate",
                    desc: "Temperature, humidity & rainfall aware",
                  },
                  { title: "pH", desc: "Optimal acidity/alkalinity balance" },
                  {
                    title: "Explainable",
                    desc: "Clear rationale behind picks",
                  },
                ].map((it) => (
                  <div
                    key={it.title}
                    className="bg-white/10 backdrop-blur rounded-xl p-3"
                  >
                    <div className="text-sm font-semibold">{it.title}</div>
                    <div className="text-xs text-emerald-50 mt-0.5">
                      {it.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-white/10 p-4 backdrop-blur">
                <div className="text-sm font-semibold">Model Roadmap</div>
                <ul className="mt-2 text-sm list-disc list-inside text-emerald-50 space-y-1">
                  <li>Confidence calibration</li>
                  <li>Top-3 alternatives</li>
                  <li>Seasonality weighting</li>
                  <li>Market price signals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Results panel */}
        {prediction && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 ring-1 ring-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-emerald-700">
                    Recommended Crop
                  </h3>
                  <p className="text-gray-600">
                    Based on pH, climate and NPK balance
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
                  {prediction.crop}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Confidence</span>
                  <span className="text-sm font-medium text-emerald-700">
                    {Math.round(prediction.confidence * 100)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{
                      width: `${Math.round(prediction.confidence * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 ring-1 ring-gray-100">
              <h4 className="text-lg font-semibold text-gray-800">
                Top Alternatives
              </h4>
              <div className="mt-3 space-y-3">
                {prediction.alternatives.map((alt) => (
                  <div key={alt.crop}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{alt.crop}</span>
                      <span className="text-sm text-gray-600">
                        {Math.round(alt.score * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full"
                        style={{ width: `${Math.round(alt.score * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
