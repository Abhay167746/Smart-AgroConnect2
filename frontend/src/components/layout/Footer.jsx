import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-t from-green-950 via-green-900 to-green-800 text-gray-300">
      {/* Top glow border */}
      <div className="pointer-events-none absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/60 to-emerald-400/0" />

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-8 bottom-0">
        {/* Pre-footer CTA */}
        <div className="mb-10 overflow-hidden rounded-2xl border border-emerald-500/20 bg-white/5 p-6 backdrop-blur-md">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Join SmartAgroConnect
              </h3>
              <p className="mt-1 text-sm text-emerald-100">
                Insights, updates, and offers for modern farming—straight to the
                inbox.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md items-center gap-2"
              aria-label="Newsletter subscription"
            >
              <input
                type="email"
                inputMode="email"
                placeholder="Enter email to subscribe"
                className="w-full rounded-xl border border-emerald-400/30 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-emerald-200 outline-none ring-emerald-300/0 transition focus:border-emerald-300/60 focus:ring-2"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="SmartAgroConnect Logo"
                className="h-20 w-auto bg-white rounded-full "
              />
              <h3 className="text-2xl font-extrabold tracking-tight text-white">
                Smart AgroConnect
              </h3>
            </div>
            <p className="mt-3 max-w-md text-sm text-emerald-100">
              Your trusted partner in agriculture—crop intelligence, IoT
              quality, and a marketplace that rewards good harvests.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                to="/about"
                className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400/20 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                aria-label="Know about us"
                title="Know about us"
              >
                Know about us
              </Link>
              <Link
                to="/contact"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                aria-label="Contact SmartAgroConnect"
                title="Contact"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Sitemap columns */}
          <div>
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/marketplace"
                  className="hover:text-white focus:outline-none focus:underline"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to="/crop-prediction"
                  className="hover:text-white focus:outline-none focus:underline"
                >
                  Crop Prediction
                </Link>
              </li>
              <li>
                <Link
                  to="/iot-quality"
                  className="hover:text-white focus:outline-none focus:underline"
                >
                  IoT Quality
                </Link>
              </li>
              <li>
                <Link
                  to="/payments"
                  className="hover:text-white focus:outline-none focus:underline"
                >
                  Payments
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/faq"
                  className="hover:text-white focus:outline-none focus:underline"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/policy"
                  className="hover:text-white focus:outline-none focus:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white focus:outline-none focus:underline"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/learning"
                  className="hover:text-white focus:outline-none focus:underline"
                >
                  Learning Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white">Connect with us</h4>
            <p className="mt-2 text-sm text-emerald-100">
              We’re building a better farm economy, together.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="group rounded-lg p-2 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                <FaFacebook className="h-5 w-5 text-emerald-200 transition group-hover:text-white" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="group rounded-lg p-2 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                <FaYoutube className="h-5 w-5 text-emerald-200 transition group-hover:text-white" />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="group rounded-lg p-2 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                <FaWhatsapp className="h-5 w-5 text-emerald-200 transition group-hover:text-white" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="group rounded-lg p-2 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                <FaInstagram className="h-5 w-5 text-emerald-200 transition group-hover:text-white" />
              </a>
              <a
                href="#"
                aria-label="Twitter/X"
                className="group rounded-lg p-2 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                <FaXTwitter className="h-5 w-5 text-emerald-200 transition group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-emerald-100/90 md:flex-row">
            <p>© {year} SmartAgroConnect. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <Link
                to="/policy"
                className="hover:text-white focus:outline-none focus:underline"
              >
                Privacy
              </Link>
              <span aria-hidden="true">•</span>
              <Link
                to="/terms"
                className="hover:text-white focus:outline-none focus:underline"
              >
                Terms
              </Link>
              <span aria-hidden="true">•</span>
              <a
                href="#top"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-emerald-100 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                aria-label="Back to top"
                title="Back to top"
              >
                ↑ Back to top
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background accents */}
      <div className="pointer-events-none absolute -bottom-0 left-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -top-8 right-10 h-40 w-40 rounded-full bg-green-400/20 blur-3xl" />
    </footer>
  );
};

export default Footer;
