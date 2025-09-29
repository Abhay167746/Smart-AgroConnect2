import {
  alpha,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatTime(iso) {
  const d = new Date(iso);
  return d.getHours().toString().padStart(2, "0") + ":00";
}

// Custom tooltip with soft surface and series swatches
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const time = formatTime(label);
  return (
    <Box
      sx={(t) => ({
        p: 1.25,
        px: 1.5,
        borderRadius: 1.5,
        border: `1px solid ${alpha(t.palette.divider, 0.8)}`,
        bgcolor: alpha(t.palette.background.paper, 0.98),
        boxShadow: t.shadows[1],
      })}
    >
      <Typography variant="caption" sx={{ fontWeight: 600 }}>
        {time}
      </Typography>
      <Stack spacing={0.5} sx={{ mt: 0.5 }}>
        {payload.map((p) => (
          <Stack
            key={p.dataKey}
            direction="row"
            alignItems="center"
            spacing={0.75}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: 999,
                bgcolor: p.stroke || p.color,
                flexShrink: 0,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {p.name}:{" "}
              <Box
                component="span"
                sx={{ color: "text.primary", fontWeight: 600 }}
              >
                {p.value}
              </Box>
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default function NPKTrendsChart({ data = [] }) {
  const theme = useTheme();

  // Elegant series colors harmonized with MUI palette
  const cN = theme.palette.purple?.main || "#8e24aa";
  const cP = theme.palette.secondary?.main || "#7e57c2";
  const cK = theme.palette.info?.dark || "#5c6bc0";

  const cardBg = `linear-gradient(180deg, ${alpha(
    theme.palette.success.light,
    0.06
  )}, ${alpha(theme.palette.background.paper, 1)})`;

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 14, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      elevation={0}
      sx={{
        height: 340,
        borderRadius: 2.5,
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        background: cardBg,
        backdropFilter: "blur(6px)",
      }}
      aria-label="NPK nutrient trends over the past 24 hours"
    >
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              NPK Trends (24h)
            </Typography>
            <Chip size="small" variant="outlined" label="mg/kg" />
          </Stack>
        }
        sx={{ pb: 0.5 }}
      />

      <CardContent sx={{ height: "100%", pt: 1.25 }}>
        {/* Legend chips */}
        <Stack direction="row" spacing={1} sx={{ mb: 1 }} alignItems="center">
          <Chip
            size="small"
            label="N"
            sx={{
              bgcolor: alpha(cN, 0.08),
              color: cN,
              borderColor: alpha(cN, 0.3),
            }}
            variant="outlined"
          />
          <Chip
            size="small"
            label="P"
            sx={{
              bgcolor: alpha(cP, 0.08),
              color: cP,
              borderColor: alpha(cP, 0.3),
            }}
            variant="outlined"
          />
          <Chip
            size="small"
            label="K"
            sx={{
              bgcolor: alpha(cK, 0.08),
              color: cK,
              borderColor: alpha(cK, 0.3),
            }}
            variant="outlined"
          />
          <Box sx={{ flexGrow: 1 }} />
          <Chip size="small" variant="outlined" label="Smoothed" />
        </Stack>

        <Box sx={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 6, right: 12, left: 0, bottom: 4 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={alpha(theme.palette.text.secondary, 0.14)}
              />
              <XAxis
                dataKey="time"
                tickFormatter={formatTime}
                tick={{
                  fill: alpha(theme.palette.text.secondary, 0.7),
                  fontSize: 12,
                }}
                axisLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
                tickLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
                minTickGap={24}
              />
              <YAxis
                tick={{
                  fill: alpha(theme.palette.text.secondary, 0.7),
                  fontSize: 12,
                }}
                axisLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
                tickLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Lines with pleasant thickness and no dots */}
              <Line
                type="monotone"
                dataKey="n"
                name="N"
                stroke={cN}
                strokeWidth={2.25}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="p"
                name="P"
                stroke={cP}
                strokeWidth={2.25}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="k"
                name="K"
                stroke={cK}
                strokeWidth={2.25}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
