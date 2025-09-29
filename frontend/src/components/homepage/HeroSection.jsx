import { Link } from "react-router-dom";
import farmBackground from "../../assets/bg.jpg"

const HeroSection = () => {
  const year = new Date().getFullYear();

  return (
    <section
      className="relative flex h-[calc(100vh-80px)] min-h-[640px] items-center overflow-hidden"
      aria-label="SmartAgroConnect hero"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${farmBackground})` }}
        aria-hidden="true"
      />
      {/* Dark gradient overlay for readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"
        aria-hidden="true"
      />

      {/* Ambient decorative glows */}
      <div
        className="pointer-events-none absolute -top-16 left-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 h-72 w-72 rounded-full bg-green-400/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-white/10 blur-2xl"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
        {/* Pill + mini value props */}
        <div className="mx-auto mb-6 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100">
            {year} Innovation in AgriTech
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
            IoT Quality + AI Crop Advice
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
            Trusted Farmer Marketplace
          </span>
        </div>

        {/* Glass panel */}
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/15 bg-white/10 p-8 text-center text-white shadow-2xl backdrop-blur-xs md:p-12">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight drop-shadow md:text-6xl">
            Empowering Harvests, Elevating Farm Business
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg">
            One platform for smart decisions: marketplace, real‑time weather and
            soil, IoT quality, and AI crop recommendations.
          </p>

          {/* Feature chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-xl bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
              Live Weather & Soil
            </span>
            <span className="rounded-xl bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
              Sensor‑verified Quality
            </span>
            <span className="rounded-xl bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
              AI Crop Prediction
            </span>
            <span className="rounded-xl bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
              Fair Market Prices
            </span>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              aria-label="Open Marketplace"
              title="Shop Products"
            >
              Shop Products
              <svg
                className="ml-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </Link>
            <Link
              to="/list-produce"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              aria-label="List your produce"
              title="Sell Your Produce"
            >
              Sell Your Produce
              <svg
                className="ml-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </Link>
          </div>

          {/* Trust bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-white/80">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              IoT‑Verified Batches
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Transparent Payments
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Multilingual Support
            </div>
          </div>
        </div>

        {/* Bottom scroller hint */}
        <div className="pointer-events-none mt-10 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
            Scroll for more
            <svg
              className="h-3 w-3 animate-bounce"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Subtle foreground vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_60%,transparent,rgba(0,0,0,0.3))]"
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroSection;
