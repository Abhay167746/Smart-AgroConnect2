const ProduceCard = ({ item, onView, onBuy }) => {

  const qualityColor =
    item.quality === "Verified"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : item.quality === "Pending"
      ? "bg-amber-100 text-amber-800 border-amber-200"
      : "bg-rose-100 text-rose-800 border-rose-200";

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl"
      role="article"
      aria-labelledby={`produce-${item.id}-title`}
    >
      {/* Image header */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={
            item.imageUrl ||
            "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1200&auto=format&fit=crop"
          }
          alt={`${item.crop} from ${item.location}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${qualityColor}`}
            title={`Quality: ${item.quality}`}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-current opacity-80" />
            {item.quality}
          </span>
          {item.harvestDate && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-700 backdrop-blur">
              Harvest: {item.harvestDate}
            </span>
          )}
        </div>
        {/* Price badge */}
        <div className="absolute bottom-3 left-3 rounded-xl bg-white/95 px-3 py-1.5 text-sm font-bold text-gray-900 shadow backdrop-blur">
          ₹ {item.price} / {item.unit || "kg"}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              id={`produce-${item.id}-title`}
              className="text-lg font-semibold text-gray-900"
              title={item.crop}
            >
              {item.crop}{" "}
              {item.variety && (
                <span className="text-sm font-medium text-gray-500">
                  ({item.variety})
                </span>
              )}
            </h3>
            <p className="mt-0.5 text-sm text-gray-500">
              Location: {item.location}
            </p>
          </div>
          {/* Rating */}
          <div
            className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700"
            title="Seller rating"
          >
            <svg
              className="mr-1 h-4 w-4 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
            </svg>
            {Number(item.rating || 4.8).toFixed(1)}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2">
            <div className="text-[11px] uppercase tracking-wide text-emerald-700">
              Quantity
            </div>
            <div className="text-base font-semibold text-emerald-900">
              {item.quantity} {item.unit || "kg"}
            </div>
          </div>
          <div className="rounded-xl border border-sky-100 bg-sky-50 px-3 py-2">
            <div className="text-[11px] uppercase tracking-wide text-sky-700">
              Best price
            </div>
            <div className="text-base font-semibold text-sky-900">
              ₹ {item.price} / {item.unit || "kg"}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Fresh
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Same-day pickup
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onView?.(item)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-300 hover:text-emerald-700"
              aria-label={`View details of ${item.crop}`}
            >
              View
            </button>
            <button
              onClick={() => onBuy?.(item)}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label={`Buy ${item.crop}`}
            >
              Buy
            </button>
          </div>
        </div>
      </div>

      {/* Decorative glow on hover */}
      <div className="pointer-events-none absolute -inset-0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-6 top-0 h-20 rounded-full bg-gradient-to-r from-emerald-200 via-green-100 to-emerald-200" />
      </div>
    </div>
  );
};

export default ProduceCard;
