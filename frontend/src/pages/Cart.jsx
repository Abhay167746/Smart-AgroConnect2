// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {
//   const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
//   const navigate = useNavigate();

//   const totalPrice = cartItems
//     .reduce((sum, item) => sum + item.price * item.quantity, 0)
//     .toFixed(2);

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Cart is Empty</h2>
//         <p className="text-gray-600 mb-4">Add items from the marketplace to your cart.</p>
//         <button
//           onClick={() => navigate("/marketplace")}
//           className="rounded-lg bg-emerald-600 text-white px-4 py-2 font-semibold shadow hover:bg-emerald-700"
//         >
//           Go to Marketplace
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-10 px-4">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden p-6">
//         <h1 className="text-3xl font-bold text-emerald-700 mb-6">Your Cart</h1>

//         <div className="space-y-4">
//           {cartItems.map((item, idx) => (
//             <div key={idx} className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-4">
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.imageUrl || "https://via.placeholder.com/100"}
//                   alt={item.crop}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-800">{item.crop} ({item.variety})</h2>
//                   <p className="text-gray-600">₹ {item.price} / kg</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <input
//                   type="number"
//                   min="1"
//                   value={item.quantity}
//                   onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
//                   className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-300"
//                 />
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="rounded-lg border border-rose-400 text-rose-600 px-4 py-2 font-semibold hover:bg-rose-50 transition"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
//           <h2 className="text-xl font-semibold text-gray-800">Total: ₹ {totalPrice}</h2>
//           <div className="flex gap-4">
//             <button
//               onClick={() => clearCart()}
//               className="rounded-lg border border-gray-300 bg-white text-gray-700 px-4 py-2 font-semibold hover:text-rose-600 hover:border-rose-400 transition"
//             >
//               Clear Cart
//             </button>
//             <button
//               onClick={() => navigate("/checkout")}
//               className="rounded-lg bg-emerald-600 text-white px-4 py-2 font-semibold shadow hover:bg-emerald-700 transition"
//             >
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // ✅ Ensure cart is always an array
  const safeCart = Array.isArray(cart) ? cart : [];

  // ✅ Safe reduce
  const totalPrice = safeCart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  if (safeCart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-4">
          Add items from the marketplace to your cart.
        </p>
        <button
          onClick={() => navigate("/marketplace")}
          className="rounded-lg bg-emerald-600 text-white px-4 py-2 font-semibold shadow hover:bg-emerald-700"
        >
          Go to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-emerald-700 mb-6">Your Cart</h1>

        <div className="space-y-4">
          {safeCart.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/100"}
                  alt={item.crop}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.crop} ({item.variety})
                  </h2>
                  <p className="text-gray-600">₹ {item.price} / kg</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-lg border border-rose-400 text-rose-600 px-4 py-2 font-semibold hover:bg-rose-50 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Total: ₹ {totalPrice}
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => clearCart()}
              className="rounded-lg border border-gray-300 bg-white text-gray-700 px-4 py-2 font-semibold hover:text-rose-600 hover:border-rose-400 transition"
            >
              Clear Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="rounded-lg bg-emerald-600 text-white px-4 py-2 font-semibold shadow hover:bg-emerald-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
