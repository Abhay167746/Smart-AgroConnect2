import { motion, useAnimationFrame, useReducedMotion } from "framer-motion";
import React from "react";

const TestimonialCard = ({ quote, name, location, avatar }) => (
  <article
    className="group relative w-80 shrink-0 snap-center overflow-hidden rounded-2xl border border-emerald-200/40 bg-white/80 p-5 text-left text-gray-800 shadow-xl backdrop-blur transition hover:-translate-y-0.5 hover:shadow-2xl"
    tabIndex={0}
    aria-label={`Testimonial from ${name} in ${location}`}
  >
    <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_30%_0%,rgba(16,185,129,0.15),transparent_40%),radial-gradient(circle_at_80%_120%,rgba(16,185,129,0.12),transparent_40%)]" />
    <div className="flex items-center gap-3">
      <img
        src={avatar}
        alt={`${name} avatar`}
        className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-200"
        loading="lazy"
      />
      <div>
        <h4 className="text-sm font-semibold text-emerald-700">{name}</h4>
        <p className="text-xs text-gray-500">{location}</p>
      </div>
    </div>
    <p className="mt-3 text-[15px] italic leading-relaxed text-gray-700">
      “{quote}”
    </p>
    <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-400 to-green-500" />
  </article>
);

const testimonials = [
  {
    quote:
      "The market price updates are incredibly fast and accurate. It helped me get a much better deal for my paddy this season.",
    name: "Rakesh Singh",
    location: "Rudrapur, Uttarakhand",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    quote:
      "I ordered orgaic vegetables through the marketplace. The quality was excellent and delivery was on time.",
    name: "Priya Sharma",
    location: "Kashipur, Uttarakhand",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    quote:
      "The learning hub articles on pest control saved my wheat crop. Simple, effective advice for local conditions.",
    name: "Amit Kumar",
    location: "Haldwani, Uttarakhand",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    quote:
      "AI crop prediction matched our soil perfectly—reduced risk and improved yield planning for the season.",
    name: "Sunita Devi",
    location: "Aurangabad, Maharashtra",
    avatar: "https://i.pravatar.cc/100?img=48",
  },
  {
    quote:
      "IoT verification boosted buyer trust. Payments released quickly after pass—very transparent process.",
    name: "Harish Patil",
    location: "Akola, Maharashtra",
    avatar: "https://i.pravatar.cc/100?img=22",
  },
];

function InfiniteMarquee({ reverse = false, speed = 60 }) {
  // speed in px/second
  const shouldReduce = useReducedMotion(); // honors prefers-reduced-motion [web:253][web:244]
  const baseX = React.useRef(0);
  const trackRef = React.useRef(null);
  const [width, setWidth] = React.useState(0);
  const [hover, setHover] = React.useState(false);

  // Build a duplicated list to ensure seamless loop
  const items = React.useMemo(() => [...testimonials, ...testimonials], []);

  // Measure total scrollable width once mounted
  React.useEffect(() => {
    if (!trackRef.current) return;
    const total = trackRef.current.scrollWidth / 2; // half because we duplicated
    setWidth(total);
  }, []);

  // Use per-frame update for perfect, gapless loop
  useAnimationFrame((t, delta) => {
    if (shouldReduce || hover || !width) return;
    const dir = reverse ? 1 : -1;
    const px = speed * (delta / 1000) * dir;
    baseX.current += px;

    // Wrap around seamlessly
    if (baseX.current <= -width) baseX.current += width;
    if (baseX.current >= 0) baseX.current -= width;

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${baseX.current}px)`;
    }
  });

  return (
    <div
      className="relative overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Farmer testimonials"
      aria-live="polite"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* gradient masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-emerald-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-emerald-50 to-transparent" />

      <motion.div
        ref={trackRef}
        className="flex w-max gap-6 will-change-transform"
        style={{ transform: "translateX(0px)" }}
      >
        {items.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </motion.div>
    </div>
  );
}

const Testimonials = () => {
  return (
    <section className="bg-emerald-50 py-16 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-emerald-800">
            Trusted by Farmers Like You
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-emerald-800/80">
            Real stories from growers using SmartAgroConnect to plan smarter,
            sell faster, and earn better.
          </p>
        </header>

        <div className="mt-10 space-y-6">
          <InfiniteMarquee reverse={false} speed={60} />
          <InfiniteMarquee reverse={true} speed={40} />
        </div>

        <div className="mt-6 flex justify-center gap-3 text-xs text-emerald-800/80">
          <span className="rounded-full bg-emerald-100 px-3 py-1">
            Auto-scrolling • Hover to pause
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1">
            Reduced Motion respected
          </span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
