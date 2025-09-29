import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalVerify from "../components/ModalVerify";
import { useAuth } from "../context/AuthContext";
import { listProduce } from "../services/ProduceService";

export default function ListProduce() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    crop: "",
    variety: "",
    quantity: "",
    unit: "kg",
    price: "",
    location: "",
    harvestDate: "",
    imageUrl: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null); // "pass" | "fail" | null

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const required = ["crop", "quantity", "price", "location"];
    for (const key of required) {
      if (!String(form[key]).trim()) return false;
    }
    return true;
  };

  const simulateQualityCheck = async () => {
    // Simulate a sensor-driven backend check with a loader
    setVerifyOpen(true);
    setVerifyResult(null);
    await new Promise((r) => setTimeout(r, 1600));
    // Hardcode result for demo: 70% chance pass
    const pass = Math.random() < 0.7;
    setVerifyResult(pass ? "pass" : "fail");
    return pass;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.warning("Please fill all required fields.");
      return;
    }
    setSubmitting(true);

    try {
      const pass = await simulateQualityCheck();

      if (!pass) {
        toast.error(
          "Product quality did not meet standards. Please recheck and try again."
        );
        setSubmitting(false);
        return;
      }

      const payload = {
        ...form,
        quantity: Number(form.quantity),
        price: Number(form.price),
        userId: user?.uid,
        userName: user?.displayName || user?.email || "Anonymous",
        quality: "Verified", // server would set after real sensor pass
        status: "Approved",
        createdAt: new Date().toISOString(),
      };

      await listProduce(payload);
      toast.success("Produce listed successfully!");
      navigate("/marketplace");
    } catch (err) {
      console.error(err);
      toast.error("Failed to list produce. Please try again.");
    } finally {
      setSubmitting(false);
      // keep modal result visible briefly, then close
      setTimeout(() => setVerifyOpen(false), 900);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-10 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-emerald-700">
            List Your Produce
          </h2>
          <p className="mt-1 text-gray-600">
            Add details about the crop and pricing. Quality verification will
            run before listing.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-xl backdrop-blur"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Crop Name<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="crop"
                value={form.crop}
                onChange={handleChange}
                placeholder="e.g., Wheat"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Variety
              </label>
              <input
                type="text"
                name="variety"
                value={form.variety}
                onChange={handleChange}
                placeholder="e.g., Sharbati"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Quantity<span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-400 focus:outline-none"
                >
                  <option value="kg">kg</option>
                  <option value="quintal">quintal</option>
                  <option value="ton">ton</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Price (₹/{form.unit})<span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g., 28"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Location<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., Akola, MH"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Harvest Date
              </label>
              <input
                type="date"
                name="harvestDate"
                value={form.harvestDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
              <p className="mt-1 text-xs text-gray-500">
                Tip: Use a clear crop photo. You can paste a public image URL
                for now.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-lg bg-emerald-600 py-2.5 font-semibold text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Processing..." : "List Crop"}
          </button>
        </form>
      </div>

      {/* Verification Modal */}
      <ModalVerify
        open={verifyOpen}
        result={verifyResult}
        onClose={() => {
          if (!submitting) setVerifyOpen(false);
        }}
      />
    </div>
  );
}
