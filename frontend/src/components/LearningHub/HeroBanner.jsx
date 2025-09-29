export default function HeroBanner({ backgroundUrl, title, subtitle }) {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      className="relative bg-cover bg-center"
      role="banner"
      aria-label="Learning Hub hero"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 text-center text-white">
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-white/90">
          {subtitle}
        </p>
        <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-400 to-green-500" />
      </div>
    </div>
  );
}
