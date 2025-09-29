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
  Area,
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

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const time = formatTime(label);
  return (
    <Box
      sx={(t) => ({
        p: 1.25,
        px: 1.5,
        borderRadius: 1.5,
        border: `1px solid ${alpha(t.palette.divider, 0.9)}`,
        bgcolor: alpha(t.palette.background.paper, 0.98),
        boxShadow: t.shadows[1],
      })}
    >
      <Typography variant="caption" sx={{ fontWeight: 700 }}>
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

export default function SensorTrendsChart({ data = [] }) {
  const theme = useTheme();

  const cTemp = "#ff9800";
  const cHum = "#26c6da";
  const cPH = "#66bb6a";
  const cRain = theme.palette.info.light || "#90caf9";

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
        height: 380,
        borderRadius: 2.5,
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        background: cardBg,
        backdropFilter: "blur(6px)",
      }}
      aria-label="24 hour sensor trends"
    >
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              24h Sensor Trends
            </Typography>
            <Chip size="small" variant="outlined" label="Dual axis" />
          </Stack>
        }
        sx={{ pb: 0.5 }}
      />

      <CardContent sx={{ height: "100%", pt: 1.25 }}>
        {/* Inline legend chips */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Chip
            size="small"
            label="Temp (°C)"
            sx={{
              bgcolor: alpha(cTemp, 0.08),
              color: cTemp,
              borderColor: alpha(cTemp, 0.3),
            }}
            variant="outlined"
          />
          <Chip
            size="small"
            label="Humidity (%)"
            sx={{
              bgcolor: alpha(cHum, 0.08),
              color: cHum,
              borderColor: alpha(cHum, 0.3),
            }}
            variant="outlined"
          />
          <Chip
            size="small"
            label="pH"
            sx={{
              bgcolor: alpha(cPH, 0.08),
              color: cPH,
              borderColor: alpha(cPH, 0.3),
            }}
            variant="outlined"
          />
          <Box sx={{ flexGrow: 1 }} />
          <Chip
            size="small"
            label="Rainfall (mm)"
            sx={{
              bgcolor: alpha(cRain, 0.12),
              color: theme.palette.text.primary,
              borderColor: alpha(cRain, 0.4),
            }}
            variant="outlined"
          />
        </Stack>

        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 6, right: 12, left: 0, bottom: 4 }}
            >
              <defs>
                <linearGradient id="rainFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={cRain} stopOpacity={0.7} />
                  <stop offset="100%" stopColor={cRain} stopOpacity={0.1} />
                </linearGradient>
              </defs>

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
                yAxisId="left"
                domain={["auto", "auto"]}
                tick={{
                  fill: alpha(theme.palette.text.secondary, 0.7),
                  fontSize: 12,
                }}
                axisLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
                tickLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, "auto"]}
                tick={{
                  fill: alpha(theme.palette.text.secondary, 0.7),
                  fontSize: 12,
                }}
                axisLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
                tickLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Rainfall glossy area on right axis */}
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="rainfall"
                name="Rainfall (mm)"
                fill="url(#rainFill)"
                stroke={cRain}
                strokeWidth={1.5}
                isAnimationActive={false}
              />

              {/* Left-axis lines */}
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temp"
                name="Temp (°C)"
                stroke={cTemp}
                dot={false}
                strokeWidth={2.25}
                isAnimationActive={false}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="humidity"
                name="Humidity (%)"
                stroke={cHum}
                dot={false}
                strokeWidth={2}
                isAnimationActive={false}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="ph"
                name="pH"
                stroke={cPH}
                dot={false}
                strokeWidth={2}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
