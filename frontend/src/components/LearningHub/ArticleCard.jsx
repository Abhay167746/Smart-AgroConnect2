export default function ArticleCard({
  title,
  description,
  url,
  source,
  image,
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-200/40 bg-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl"
      aria-label={title}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/800x400?text=No+Image"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="line-clamp-2 text-lg font-semibold text-emerald-900">
            {title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-emerald-800/80">
            {description || "No description available"}
          </p>
        </div>
        <p className="mt-3 text-xs text-emerald-700/70">Source: {source}</p>
      </div>
    </a>
  );
}
