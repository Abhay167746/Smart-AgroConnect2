import { alpha, Box, Chip, Grid, Stack, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import ActiveListingsCard from "../components/dashboard/ActiveListingsCard";
import CropRecommendationCard from "../components/dashboard/CropRecommendationCard";
import IoTQualityStatusCard from "../components/dashboard/IoTQualityStatusCard";
import MarketPricesCard from "../components/dashboard/MarketPricesCard";
import WalletPreviewCard from "../components/dashboard/WalletPreviewCard";
import WeatherSoilCard from "../components/dashboard/WeatherSoilCard";
import WelcomeHeader from "../components/dashboard/WelcomeHeader";
import { useAuth } from "../context/AuthContext";

const MotionBox = motion.create(Box);
const MotionGridItem = motion.create(Grid);

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(2px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

export default function DashboardOverview() {
  const { user } = useAuth();
  const theme = useTheme();
  const farmer = {
    name: user ? user.displayName || "Farmer" : "Farmer",
    location: "Shibpur, West Bengal",
  };

  const accent = theme.palette.success.main;
  const soft = (c, a) => alpha(c, a);

  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 3 },
        maxWidth: 1400,
        mx: "auto",
      }}
    >
      {/* Hero welcome with soft gradient glow */}
      <MotionBox
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        sx={{
          mb: 2.5,
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
          border: `1px solid ${soft(theme.palette.success.main, 0.16)}`,
          background: `linear-gradient(180deg, ${soft(
            theme.palette.success.light,
            0.12
          )}, ${soft(theme.palette.success.light, 0.04)})`,
          backdropFilter: "blur(8px)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(1200px 300px at 10% 0%, ${soft(
              accent,
              0.18
            )} 0%, transparent 60%), radial-gradient(900px 260px at 90% 0%, ${soft(
              accent,
              0.12
            )} 0%, transparent 60%)`,
          }}
        />
        <Box sx={{ position: "relative", p: { xs: 2, md: 3 } }}>
          <WelcomeHeader farmer={farmer} />
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mt: 1, flexWrap: "wrap" }}
          >
            <Chip
              size="small"
              label="Live Weather & Soil"
              color="success"
              variant="outlined"
            />
            <Chip
              size="small"
              label="IoT-verified quality"
              variant="outlined"
            />
            <Chip size="small" label="AI crop advice" variant="outlined" />
            <Chip size="small" label="Fair market prices" variant="outlined" />
          </Stack>
        </Box>
      </MotionBox>

      {/* Content grid with consistent gutters and balanced composition */}
      <MotionBox variants={containerStagger} initial="hidden" animate="visible">
        <Grid container spacing={2.25}>
          {/* Row 1: Weather+Soil | Crop Recommendation */}
          <MotionGridItem item xs={12} md={5} variants={fadeUp} custom={1}>
            <WeatherSoilCard
              location={farmer.location}
              weather={{
                tempC: 29,
                humidity: 55,
                windKph: 10,
                precipMm: 1,
                condition: "Partly Cloudy",
              }}
              soil={{ ph: 6.6, n: 42, p: 30, k: 28 }}
            />
          </MotionGridItem>

          <MotionGridItem item xs={12} md={7} variants={fadeUp} custom={2}>
            <CropRecommendationCard
              recommended={{
                crop: "Banana",
                reason: "pH and humidity favorable",
              }}
              alternatives={[
                { crop: "Maize", score: 0.87 },
                { crop: "Sugarcane", score: 0.84 },
                { crop: "Soybean", score: 0.8 },
              ]}
            />
          </MotionGridItem>

          {/* Row 2: Prices | Listings */}
          <MotionGridItem item xs={12} md={6} variants={fadeUp} custom={3}>
            <MarketPricesCard
              region="Maharashtra"
              series={[
                { name: "Wheat", price: 23.5, trend: [21, 22, 22.5, 23, 23.5] },
                {
                  name: "Rice",
                  price: 28.2,
                  trend: [27.5, 27.6, 27.9, 28.0, 28.2],
                },
                {
                  name: "Soybean",
                  price: 49.1,
                  trend: [48, 48.5, 48.8, 49.0, 49.1],
                },
              ]}
            />
          </MotionGridItem>

          <MotionGridItem item xs={12} md={6} variants={fadeUp} custom={4}>
            <ActiveListingsCard
              items={[
                {
                  id: "LST-1021",
                  crop: "Wheat",
                  qtyKg: 500,
                  buyer: "AgroMart",
                  status: "Payment Pending",
                },
                {
                  id: "LST-1020",
                  crop: "Rice",
                  qtyKg: 300,
                  buyer: "FreshHub",
                  status: "Approved",
                },
                {
                  id: "LST-1019",
                  crop: "Soybean",
                  qtyKg: 200,
                  buyer: "AgriTrade",
                  status: "Quality Check",
                },
              ]}
            />
          </MotionGridItem>

          {/* Row 3: IoT | Wallet */}
          <MotionGridItem item xs={12} md={5} variants={fadeUp} custom={5}>
            <IoTQualityStatusCard
              current={{ methanePPM: 8, status: "PASS" }}
              lastBatch={{ status: "PASS", released: true }}
              link="/iot-quality"
            />
          </MotionGridItem>

          <MotionGridItem item xs={12} md={7} variants={fadeUp} custom={6}>
            <WalletPreviewCard
              balance={12450}
              transactions={[
                {
                  id: "TX-7781",
                  text: "Buyer deposited ₹3,000 for Wheat",
                  time: "Today, 10:05",
                },
                {
                  id: "TX-7776",
                  text: "IoT verification passed, payment released ₹12,450",
                  time: "Yesterday, 17:40",
                },
                {
                  id: "TX-7770",
                  text: "Refund sent to buyer ₹1,200",
                  time: "Sep 20, 14:12",
                },
              ]}
              link="/payments"
            />
          </MotionGridItem>
        </Grid>
      </MotionBox>

      {/* Subtle bottom gradient vignette */}
      <Box
        sx={{
          mt: 2,
          height: 6,
          borderRadius: 6,
          background: `linear-gradient(90deg, ${soft(accent, 0.2)}, ${soft(
            accent,
            0.04
          )})`,
        }}
      />
    </Box>
  );
}
