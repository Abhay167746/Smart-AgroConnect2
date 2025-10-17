import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShieldCheck, Truck, Leaf } from "lucide-react"; 

export default function Buy() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          No Product Selected
        </h2>
        <p className="text-gray-600 mb-4">Please return to the marketplace.</p>
        <button
          onClick={() => navigate("/marketplace")}
          className="rounded-lg bg-emerald-600 text-white px-4 py-2 font-semibold shadow hover:bg-emerald-700"
        >
          Go to Marketplace
        </button>
      </div>
    );
  }

  const totalPrice = (Number(item.price) * quantity).toFixed(2);

  const handlePlaceOrder = () => {
    navigate("/dashboard"); // place order logic
  };

  const handleAddToCart = () => {
    addToCart(item, quantity);
    navigate("/cart"); // redirect to Cart page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {/* Header section */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <img
              src={item.imageUrl || "https://via.placeholder.com/400x300"}
              alt={item.crop}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-emerald-600 text-white text-sm px-3 py-1 rounded-lg shadow">
              {item.quality || "Verified"}
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-emerald-700 mb-2">
                {item.crop} ({item.variety})
              </h1>
              <p className="text-gray-600 mb-2">
                <strong>Farmer:</strong> {item.farmer || "Verified Farmer"}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> {item.location || "Unknown"}
              </p>
              <p className="text-emerald-700 font-semibold text-xl mt-4">
                ₹ {item.price} / kg
              </p>
              <p className="mt-3 text-gray-600">
                {item.description ||
                  "Freshly harvested, IoT-verified produce directly from trusted farmers."}
              </p>

              {/* Quantity and Total */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm text-gray-700 font-semibold">
                  Quantity (kg):
                </span>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              </div>

              <div className="mt-4 text-lg font-semibold text-gray-800">
                Total: ₹ {totalPrice}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handlePlaceOrder}
                className="w-full sm:w-auto rounded-lg bg-emerald-600 text-white px-6 py-2 font-semibold shadow hover:bg-emerald-700 transition"
              >
                Place Order
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white text-gray-700 px-6 py-2 font-semibold hover:text-emerald-700 hover:border-emerald-400 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate("/marketplace")}
                className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white text-gray-700 px-6 py-2 font-semibold hover:text-emerald-700 hover:border-emerald-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Trust and assurance section */}
        <div className="bg-emerald-50 px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border-t border-gray-100">
          <div className="flex flex-col items-center">
            <ShieldCheck className="text-emerald-600 w-8 h-8 mb-2" />
            <h3 className="font-semibold text-gray-800">IoT Verified</h3>
            <p className="text-sm text-gray-600">
              Every batch is tested for quality using IoT devices.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="text-emerald-600 w-8 h-8 mb-2" />
            <h3 className="font-semibold text-gray-800">Fast Delivery</h3>
            <p className="text-sm text-gray-600">
              Direct delivery from local farmers within 24-48 hours.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Leaf className="text-emerald-600 w-8 h-8 mb-2" />
            <h3 className="font-semibold text-gray-800">Sustainable</h3>
            <p className="text-sm text-gray-600">
              Supporting organic and sustainable farming practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
