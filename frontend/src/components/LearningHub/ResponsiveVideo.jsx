export default function ResponsiveVideo({ title, src }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-200/40 bg-white shadow-lg">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute left-0 top-0 h-full w-full"
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="bg-white p-3">
        <h3 className="text-sm font-semibold text-emerald-900">{title}</h3>
      </div>
    </div>
  );
}
