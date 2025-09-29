import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { motion } from "framer-motion";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 140, damping: 18 },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="
        relative min-h-screen w-full overflow-hidden
        bg-fixed bg-cover bg-center
        bg-[url('https://images.pexels.com/photos/265242/pexels-photo-265242.jpeg')]
      "
    >
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-emerald-900/40 to-black/70" />

      {/* Animated spotlight blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-400/25 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-lime-400/15 blur-3xl"
      />

      {/* Floating title */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex items-center justify-center px-4 pt-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
          Farmer Login
        </h1>
      </motion.div>

      {/* Centered glass card */}
      <div className="relative z-10 flex items-center justify-center px-4 py-10">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="
            relative w-full max-w-md
            rounded-3xl border border-white/15
            bg-white/10 backdrop-blur-xl
            shadow-[0_12px_50px_-12px_rgba(16,185,129,0.45)]
            ring-1 ring-white/10
            p-8
          "
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          {/* Inner highlight + subtle noise via gradient */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5" />

          <motion.form
            onSubmit={handleLogin}
            variants={container}
            initial="hidden"
            animate="show"
            className="relative flex flex-col gap-5"
          >
            <motion.label
              variants={itemUp}
              className="text-sm font-medium text-white/90"
            >
              Email
              <input
                type="email"
                placeholder="name@example.com"
                className="
                  mt-2 w-full rounded-xl
                  bg-white/20 placeholder-white/60
                  border border-white/20
                  px-4 py-3 text-white
                  outline-none
                  focus:ring-2 focus:ring-emerald-300/70 focus:border-emerald-300/70
                  transition
                  shadow-inner
                "
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </motion.label>

            <motion.label
              variants={itemUp}
              className="text-sm font-medium text-white/90"
            >
              Password
              <input
                type="password"
                placeholder="••••••••"
                className="
                  mt-2 w-full rounded-xl
                  bg-white/20 placeholder-white/60
                  border border-white/20
                  px-4 py-3 text-white
                  outline-none
                  focus:ring-2 focus:ring-emerald-300/70 focus:border-emerald-300/70
                  transition
                  shadow-inner
                "
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </motion.label>

            <motion.button
              type="submit"
              variants={itemUp}
              className="
                mt-2 inline-flex items-center justify-center
                rounded-xl bg-emerald-500 px-6 py-3
                font-semibold text-white
                shadow-lg shadow-emerald-600/30
                hover:bg-emerald-600 hover:shadow-emerald-700/30
                active:scale-[0.99]
                transition
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300 focus:ring-offset-transparent
                disabled:opacity-70
              "
              disabled={loading}
              aria-busy={loading}
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -1 }}
            >
              {loading ? (
                <motion.div
                  className="h-5 w-5 rounded-full border-2 border-white/90 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.9,
                    ease: "linear",
                  }}
                />
              ) : (
                "Login"
              )}
            </motion.button>

            <motion.div variants={itemUp} className="mt-1 text-center">
              <Link
                to="/signup"
                className="
                  text-emerald-200 hover:text-white
                  underline underline-offset-4 decoration-emerald-300/60 hover:decoration-white
                  transition
                "
              >
                Don’t have an account? Sign Up
              </Link>
            </motion.div>

            <motion.div variants={itemUp} className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-transparent px-3 text-white/70 backdrop-blur-sm">
                  or
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={itemUp}
              className="flex items-center justify-center"
            >
              <div className="w-full">
                <GoogleButton
                  onClick={handleGoogleSignIn}
                  type="dark"
                  style={{
                    width: "100%",
                    borderRadius: "0.75rem",
                    boxShadow:
                      "0 10px 25px -10px rgba(59,130,246,0.45), inset 0 1px 0 0 rgba(255,255,255,0.15)",
                  }}
                />
              </div>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
