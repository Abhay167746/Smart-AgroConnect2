import {
  FaChartLine,
  FaCloudSun,
  FaNewspaper,
  FaSeedling,
} from "react-icons/fa";

const UtilityItem = ({
  icon,
  title,
  data,
  accent = "from-emerald-400 to-green-500",
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`group relative w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5 text-left shadow-xl backdrop-blur-md transition md:p-6`}
    aria-label={`${title}: ${data}`}
  >
    {/* Decorative background glow */}
    <div
      className={`pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_120%_120%,rgba(16,185,129,0.16),transparent_40%)] transition`}
      aria-hidden="true"
    />
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-lg shadow-emerald-500/20 transition group-hover:scale-105`}
        >
          <span className="text-xl">{icon}</span>
        </div>
        <div>
          <h3 className="text-base font-semibold text-emerald-950 md:text-lg">
            {title}
          </h3>
          <p className="text-sm text-emerald-900/80 md:text-[15px]">{data}</p>
        </div>
      </div>

      {/* Pulse dot on hover for life */}
      <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-500 opacity-70 transition group-hover:animate-pulse" />
    </div>

    {/* Bottom accent bar */}
    <div
      className={`mt-4 h-1 w-24 rounded-full bg-gradient-to-r ${accent} opacity-90 transition group-hover:w-28`}
    />
  </button>
);

const UtilityBar = () => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-6 left-10 h-24 w-24 rounded-full bg-emerald-400/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-6 right-10 h-28 w-28 rounded-full bg-green-400/20 blur-2xl" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        <UtilityItem
          icon={<FaCloudSun />}
          title="Weather (2:39 PM)"
          data="31°C • Humid & Sunny"
          accent="from-sky-400 to-emerald-500"
          onClick={() => {}}
        />
        <UtilityItem
          icon={<FaChartLine />}
          title="Market Rates"
          data="Paddy ₹2,203/Quintal • ▲"
          accent="from-amber-400 to-orange-500"
          onClick={() => {}}
        />
        <UtilityItem
          icon={<FaNewspaper />}
          title="Kisan News"
          data="New irrigation subsidy"
          accent="from-blue-500 to-indigo-500"
          onClick={() => {}}
        />
        <UtilityItem
          icon={<FaSeedling />}
          title="Crop Advisory"
          data="Check for stem borer"
          accent="from-lime-500 to-green-500"
          onClick={() => {}}
        />
      </div>
    </section>
  );
};

export default UtilityBar;
