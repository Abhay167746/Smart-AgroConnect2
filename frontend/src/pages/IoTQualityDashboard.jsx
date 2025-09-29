import {
  alpha,
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import LastUpdated from "../components/iot/LastUpdated";
import LegendToolbar from "../components/iot/LegendToolbar";
import NPKTrendsChart from "../components/iot/NPKTrendsChart";
import PumpActivityChart from "../components/iot/PumpActivityChart";
import SensorSummaryCards from "../components/iot/SensorSummaryCard";
import SensorTrendsChart from "../components/iot/SensorTrendsChart";
import WateringScheduleChart from "../components/iot/WateringScheduleChart";
import WeatherCard from "../components/iot/WeatherCard";
import React from "react";
// demo data (replace with live sensor/api later)
const now = new Date();
const hoursBack = (h) => new Date(now.getTime() - h * 3600 * 1000);
const timeSeries = Array.from({ length: 24 }, (_, i) => {
  const t = hoursBack(23 - i);
  return {
    time: t.toISOString(),
    temp: 22 + Math.sin(i / 3) * 3,
    humidity: 60 + Math.cos(i / 4) * 10,
    rainfall: Math.max(0, (i % 6 === 0 ? 5 : 0) + (i === 7 ? 12 : 0)),
    ph: 6.5 + Math.sin(i / 8) * 0.2,
    n: 40 + (i % 5 === 0 ? -4 : 0),
    p: 32 + (i % 7 === 0 ? -3 : 0),
    k: 28 + (i % 9 === 0 ? -2 : 0),
  };
});
const pumpEvents = [
  { start: hoursBack(21), end: hoursBack(20), status: "ON" },
  { start: hoursBack(12.5), end: hoursBack(12), status: "ON" },
  { start: hoursBack(3.2), end: hoursBack(2.5), status: "ON" },
];
const pumpOnNow = false;
const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(2px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function IoTQualityDashboard() {
  const theme = useTheme();
  const soft = (c, a) => alpha(c, a);

  // Toolbar state
  const [range, setRange] = React.useState("24h");
  const [autoRefresh, setAutoRefresh] = React.useState(false);

  // Filter series by range (simple demo slice)
  const filteredSeries = React.useMemo(() => {
    if (range === "6h") return timeSeries.slice(-6);
    if (range === "7d") return timeSeries; // placeholder; wire weekly data later
    return timeSeries; // 24h
  }, [range]);

  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 3 },
        maxWidth: 1400,
        mx: "auto",
      }}
    >
      {/* Hero header */}
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
            0.1
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
              theme.palette.success.main,
              0.18
            )} 0%, transparent 60%), radial-gradient(900px 260px at 90% 0%, ${soft(
              theme.palette.success.main,
              0.12
            )} 0%, transparent 60%)`,
          }}
        />
        <Box sx={{ position: "relative", p: { xs: 2, md: 3 } }}>
          <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                IoT Monitoring Dashboard
              </Typography>
              <Chip size="small" variant="outlined" label="Live telemetry" />
            </Stack>
            <LastUpdated timestamp={now.toISOString()} />
          </Stack>
        </Box>
      </MotionBox>

      {/* Top row: Summary + Weather */}
      <Grid container spacing={2.25}>
        <MotionGrid
          item
          xs={12}
          md={8}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <SensorSummaryCards
            temp={filteredSeries.at(-1).temp}
            humidity={filteredSeries.at(-1).humidity}
            rainfall={filteredSeries.at(-1).rainfall}
            ph={filteredSeries.at(-1).ph}
            n={filteredSeries.at(-1).n}
            p={filteredSeries.at(-1).p}
            k={filteredSeries.at(-1).k}
            pumpOnNow={pumpOnNow}
          />
        </MotionGrid>
        <MotionGrid
          item
          xs={12}
          md={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <WeatherCard
            location="Shibpur, Howrah"
            tempC={30}
            humidity={52}
            windKph={11}
            precipMm={1}
            condition="Partly Cloudy"
          />
        </MotionGrid>

        {/* Toolbar */}
        <MotionGrid
          item
          xs={12}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <LegendToolbar
            range={range}
            onRangeChange={setRange}
            autoRefresh={autoRefresh}
            onToggleRefresh={setAutoRefresh}
            showLegend
            legend={[
              { label: "Temp (°C)", color: "#ff9800" },
              { label: "Humidity (%)", color: "#26c6da" },
              { label: "pH", color: "#66bb6a" },
              {
                label: "Rainfall (mm)",
                color: theme.palette.info.light || "#90caf9",
              },
            ]}
          />
        </MotionGrid>

        {/* Trends + Pump column */}
        <MotionGrid
          item
          xs={12}
          md={8}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <SensorTrendsChart data={filteredSeries} />
        </MotionGrid>
        <MotionGrid
          item
          xs={12}
          md={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <PumpActivityChart events={pumpEvents} pumpOnNow={pumpOnNow} />
          <Box sx={{ my: 2 }} />
          <WateringScheduleChart events={pumpEvents} />
        </MotionGrid>

        {/* Divider */}
        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
        </Grid>

        {/* NPK row */}
        <MotionGrid
          item
          xs={12}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          <NPKTrendsChart data={filteredSeries} />
        </MotionGrid>
      </Grid>
    </Box>
  );
}
