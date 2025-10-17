// import { useEffect, useMemo, useState } from "react";
// import ProduceCard from "../components/ProduceCard";
// import demoProducts from "../data/demoProducts";
// import { getProduceList } from "../services/ProduceService";
// import { Link, useNavigate } from "react-router-dom";


// const statusOptions = ["All", "Verified", "Pending", "Failed"];
// const sortOptions = [
//   { label: "Featured", value: "featured" },
//   { label: "Price: Low to High", value: "price_asc" },
//   { label: "Price: High to Low", value: "price_desc" },
//   { label: "Newest", value: "newest" },
//   { label: "Rating", value: "rating" },
// ];

// function useDebounced(value, delay = 300) {
//   const [v, setV] = useState(value);
//   useEffect(() => {
//     const t = setTimeout(() => setV(value), delay);
//     return () => clearTimeout(t);
//   }, [value, delay]);
//   return v;
// }
// function SkeletonCard() {
//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
//       <div className="h-44 w-full animate-pulse bg-gray-200" />
//       <div className="space-y-3 p-4">
//         <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
//         <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
//         <div className="grid grid-cols-2 gap-3">
//           <div className="h-10 animate-pulse rounded-lg bg-gray-200" />
//           <div className="h-10 animate-pulse rounded-lg bg-gray-200" />
//         </div>
//         <div className="mt-2 flex justify-end gap-2">
//           <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
//           <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Marketplace() {
//   /* Data state */
//    const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [produceList, setProduceList] = useState([]);
//   const [error, setError] = useState(""); // clear and specific error keeps UX transparent [web:154]

//   /* UI state */
//   const [q, setQ] = useState("");
//   const [cropFilter, setCropFilter] = useState("All");
//   const [status, setStatus] = useState("Verified"); // default to verified to build trust and reduce noise [web:154]
//   const [refreshing, setRefreshing] = useState(false); // non-blocking background refresh improves responsiveness [web:154]
//   const [location, setLocation] = useState("All");
//   const [priceMax, setPriceMax] = useState(100);
//   const [sortBy, setSortBy] = useState("featured");
//   const [visible, setVisible] = useState(9);

//   const dq = useDebounced(q, 300); // smooth search typing experience [web:154]

//   /* Shared fetch with background refresh support */
//   async function fetchData({ background = false } = {}) {
//     if (!background) setLoading(true);
//     setError("");
//     try {
//       const data = await getProduceList();
//       // Fallback: if backend returns empty/undefined, use demo products
//       const normalized =
//         Array.isArray(data) && data.length > 0 ? data : demoProducts;
//       setProduceList(normalized);
//     } catch (err) {
//       console.error("Error fetching produce", err);
//       setProduceList(demoProducts);
//     } finally {
//       if (!background) setLoading(false);
//       if (background) setRefreshing(false);
//     }
//   }

//   // reusing one fetcher prevents duplication and keeps logic consistent across loads [web:154]

//   useEffect(() => {
//     fetchData();
//   }, []); // initial load pulled once, subsequent refreshes use background mode [web:154]

//   /* Derive filter lists */
//   const crops = useMemo(() => {
//     const set = new Set(produceList.map((i) => i.crop));
//     return ["All", ...Array.from(set)];
//   }, [produceList]); // dynamic crop list ensures filters reflect available items without hardcoding [web:154]

//   const locations = useMemo(() => {
//     const set = new Set(produceList.map((i) => i.location));
//     return ["All", ...Array.from(set)];
//   }, [produceList]); // same approach for location provides flexible discovery across regions [web:154]

//   const maxPrice = useMemo(() => {
//     return Math.max(100, ...produceList.map((i) => Number(i.price) || 0));
//   }, [produceList]); // slider bounds adapt to data to prevent dead ranges [web:154]

//   useEffect(() => {
//     setPriceMax(maxPrice);
//   }, [maxPrice]); // auto-sets initial slider to max for intuitive “show all” behavior [web:154]

//   /* Derived pending banner state */
//   const hasPending = useMemo(
//     () => produceList.some((i) => (i.quality || i.status) === "Pending"),
//     [produceList]
//   ); // pending banner sets expectations and ties into the IoT verification story [web:190]

//   /* Filter + sort pipeline */
//   const filtered = useMemo(() => {
//     let res = [...produceList];

//     if (dq.trim()) {
//       const s = dq.toLowerCase();
//       res = res.filter(
//         (i) =>
//           i.crop?.toLowerCase().includes(s) ||
//           i.variety?.toLowerCase().includes(s) ||
//           i.location?.toLowerCase().includes(s)
//       );
//     }
//     if (cropFilter !== "All") {
//       res = res.filter((i) => i.crop === cropFilter);
//     }
//     if (status !== "All") {
//       res = res.filter((i) => (i.quality || i.status) === status);
//     }
//     if (location !== "All") {
//       res = res.filter((i) => i.location === location);
//     }
//     res = res.filter((i) => Number(i.price) <= Number(priceMax));

//     switch (sortBy) {
//       case "price_asc":
//         res.sort((a, b) => Number(a.price) - Number(b.price));
//         break;
//       case "price_desc":
//         res.sort((a, b) => Number(b.price) - Number(a.price));
//         break;
//       case "newest":
//         res.sort(
//           (a, b) => new Date(b.harvestDate || 0) - new Date(a.harvestDate || 0)
//         );
//         break;
//       case "rating":
//         res.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
//         break;
//       default:
//         // featured: keep natural order or server-curated ordering
//         break;
//     }
//     return res;
//   }, [produceList, dq, cropFilter, status, location, priceMax, sortBy]); // explicit pipeline makes behavior predictable and maintainable for future server-side filtering [web:154]

//   const visibleItems = filtered.slice(0, visible); // simple “Load more” pagination keeps initial load light and demo-friendly [web:154]

//   /* Actions */
//   const handleView = (item) => {
//     // navigate to product detail later
//     console.log("view", item);
//   }; // placeholder detail navigation keeps hooks minimal until detail page is ready [web:154]

//   const handleBuy = (item) => {
//     // open checkout or request flow
//     navigate("/buy", { state: { item } });
//     console.log("buy", item);
//   }; // hook for future order flow without blocking the current UI [web:154]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
//       <div className="mx-auto max-w-7xl px-4 py-8">
//         {/* Header */}
//         <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
//           <div>
//             <h1 className="text-3xl font-extrabold tracking-tight text-emerald-700">
//               Marketplace
//             </h1>
//             <p className="mt-1 text-gray-600">
//               Discover fresh produce from verified farmers.
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <Link
//               to="/marketplace/list"
//               className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
//             >
//               + List Your Produce
//             </Link>
//             <button
//               onClick={() => {
//                 setRefreshing(true);
//                 fetchData({ background: true });
//               }}
//               className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
//             >
//               {refreshing ? "Refreshing..." : "Refresh"}
//             </button>
//           </div>
//         </div>
//         {refreshing && (
//           <div className="mb-3 h-1 w-full overflow-hidden rounded bg-emerald-100">
//             <div className="h-full w-2/3 animate-pulse bg-emerald-400" />
//           </div>
//         )}{" "}
//         {/* non-blocking inline progress communicates background fetch without disrupting browsing [web:154] */}
//         {/* Pending verification banner */}
//         {hasPending && (
//           <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
//             Some listings are pending IoT quality verification and will appear
//             after approval.
//           </div>
//         )}{" "}
//         {/* expectation-setting banner improves clarity when items don’t show immediately after listing [web:190] */}
//         {/* Filters row */}
//         <div className="mb-6 rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-sm backdrop-blur">
//           <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//             {/* Search */}
//             <div className="relative w-full md:max-w-sm">
//               <input
//                 type="text"
//                 placeholder="Search by crop, variety, location..."
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//                 className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm shadow-sm placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
//               />
//               <svg
//                 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
//                 viewBox="0 0 24 24"
//                 fill="none"
//               >
//                 <path
//                   d="M21 21l-4.3-4.3M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 />
//               </svg>
//             </div>

//             {/* Selects */}
//             <div className="flex flex-wrap gap-2">
//               <select
//                 className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
//                 value={cropFilter}
//                 onChange={(e) => setCropFilter(e.target.value)}
//               >
//                 {crops.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//               >
//                 {statusOptions.map((s) => (
//                   <option key={s} value={s}>
//                     {s}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//               >
//                 {locations.map((l) => (
//                   <option key={l} value={l}>
//                     {l}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 {sortOptions.map((o) => (
//                   <option key={o.value} value={o.value}>
//                     {o.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Price slider */}
//             <div className="flex items-center gap-3">
//               <span className="text-sm text-gray-600">Max price</span>
//               <input
//                 type="range"
//                 min="0"
//                 max={maxPrice}
//                 value={priceMax}
//                 onChange={(e) => setPriceMax(Number(e.target.value))}
//                 className="h-2 w-48 cursor-pointer appearance-none rounded-lg bg-emerald-100"
//               />
//               <span className="text-sm font-semibold text-emerald-700">
//                 ₹ {priceMax}
//               </span>
//             </div>
//           </div>
//         </div>
//         {/* Content grid */}
//         {error ? (
//           <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-rose-800">
//             {error}
//           </div>
//         ) : loading ? (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {Array.from({ length: 9 }).map((_, i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
//             <img
//               src="https://illustrations.popsy.co/green/organic-food.svg"
//               alt="No items"
//               className="mb-4 h-40 w-40"
//               loading="lazy"
//             />
//             <h3 className="text-lg font-semibold text-gray-800">
//               No produce found
//             </h3>
//             <p className="mt-1 max-w-md text-sm text-gray-600">
//               Try clearing filters or list a new item for buyers to discover.
//             </p>
//             <Link
//               to="/marketplace/list"
//               className="mt-4 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
//             >
//               + List Your Produce
//             </Link>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {visibleItems.map((item, idx) => (
//                 <ProduceCard
//                   key={item.id || idx}
//                   item={item}
//                   onView={() => handleView(item)}
//                   onBuy={() => handleBuy(item)}
//                 />
//               ))}
//             </div>

//             {visible < filtered.length && (
//               <div className="mt-8 flex justify-center">
//                 <button
//                   onClick={() => setVisible((v) => v + 9)}
//                   className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
//                 >
//                   Load more
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import ProduceCard from "../components/ProduceCard";
import demoProducts from "../data/demoProducts";
import { getProduceList } from "../services/ProduceService";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Make sure you have CartContext

const statusOptions = ["All", "Verified", "Pending", "Failed"];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
  { label: "Rating", value: "rating" },
];

function useDebounced(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="h-44 w-full animate-pulse bg-gray-200" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-10 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-10 animate-pulse rounded-lg bg-gray-200" />
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function Marketplace() {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Get addToCart from context

  const [loading, setLoading] = useState(true);
  const [produceList, setProduceList] = useState([]);
  const [error, setError] = useState("");

  const [q, setQ] = useState("");
  const [cropFilter, setCropFilter] = useState("All");
  const [status, setStatus] = useState("Verified");
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState("All");
  const [priceMax, setPriceMax] = useState(100);
  const [sortBy, setSortBy] = useState("featured");
  const [visible, setVisible] = useState(9);

  const dq = useDebounced(q, 300);

  async function fetchData({ background = false } = {}) {
    if (!background) setLoading(true);
    setError("");
    try {
      const data = await getProduceList();
      const normalized = Array.isArray(data) && data.length > 0 ? data : demoProducts;
      setProduceList(normalized);
    } catch (err) {
      console.error("Error fetching produce", err);
      setProduceList(demoProducts);
    } finally {
      if (!background) setLoading(false);
      if (background) setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const crops = useMemo(() => {
    const set = new Set(produceList.map((i) => i.crop));
    return ["All", ...Array.from(set)];
  }, [produceList]);

  const locations = useMemo(() => {
    const set = new Set(produceList.map((i) => i.location));
    return ["All", ...Array.from(set)];
  }, [produceList]);

  const maxPrice = useMemo(() => {
    return Math.max(100, ...produceList.map((i) => Number(i.price) || 0));
  }, [produceList]);

  useEffect(() => {
    setPriceMax(maxPrice);
  }, [maxPrice]);

  const hasPending = useMemo(
    () => produceList.some((i) => (i.quality || i.status) === "Pending"),
    [produceList]
  );

  const filtered = useMemo(() => {
    let res = [...produceList];

    if (dq.trim()) {
      const s = dq.toLowerCase();
      res = res.filter(
        (i) =>
          i.crop?.toLowerCase().includes(s) ||
          i.variety?.toLowerCase().includes(s) ||
          i.location?.toLowerCase().includes(s)
      );
    }
    if (cropFilter !== "All") res = res.filter((i) => i.crop === cropFilter);
    if (status !== "All") res = res.filter((i) => (i.quality || i.status) === status);
    if (location !== "All") res = res.filter((i) => i.location === location);
    res = res.filter((i) => Number(i.price) <= Number(priceMax));

    switch (sortBy) {
      case "price_asc":
        res.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price_desc":
        res.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "newest":
        res.sort((a, b) => new Date(b.harvestDate || 0) - new Date(a.harvestDate || 0));
        break;
      case "rating":
        res.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
        break;
      default:
        break;
    }
    return res;
  }, [produceList, dq, cropFilter, status, location, priceMax, sortBy]);

  const visibleItems = filtered.slice(0, visible);

  const handleView = (item) => {
    console.log("view", item);
  };

  const handleBuy = (item) => {
    // Redirect to Buy page
    navigate("/buy", { state: { item } });
  };

  const handleAddToCart = (item) => {
    addToCart(item, 1); // add quantity 1
    navigate("/cart"); // redirect to Cart page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-emerald-700">
              Marketplace
            </h1>
            <p className="mt-1 text-gray-600">Discover fresh produce from verified farmers.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/marketplace/list"
              className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white shadow hover:bg-emerald-700"
            >
              + List Your Produce
            </Link>
            <button
              onClick={() => {
                setRefreshing(true);
                fetchData({ background: true });
              }}
              className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {hasPending && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            Some listings are pending IoT quality verification and will appear after approval.
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-sm backdrop-blur">
          {/* Search + Filters */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <input
                type="text"
                placeholder="Search by crop, variety, location..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm shadow-sm placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21l-4.3-4.3M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value)}
              >
                {crops.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <select
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price slider */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Max price</span>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="h-2 w-48 cursor-pointer appearance-none rounded-lg bg-emerald-100"
              />
              <span className="text-sm font-semibold text-emerald-700">₹ {priceMax}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        {error ? (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-rose-800">
            {error}
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <img
              src="https://illustrations.popsy.co/green/organic-food.svg"
              alt="No items"
              className="mb-4 h-40 w-40"
              loading="lazy"
            />
            <h3 className="text-lg font-semibold text-gray-800">No produce found</h3>
            <p className="mt-1 max-w-md text-sm text-gray-600">
              Try clearing filters or list a new item for buyers to discover.
            </p>
            <Link
              to="/marketplace/list"
              className="mt-4 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
            >
              + List Your Produce
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleItems.map((item, idx) => (
                <ProduceCard
                  key={item.id || idx}
                  item={item}
                  onView={() => handleView(item)}
                  onBuy={() => handleBuy(item)}
                  onAddToCart={() => handleAddToCart(item)}
                />
              ))}
            </div>

            {visible < filtered.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setVisible((v) => v + 9)}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
