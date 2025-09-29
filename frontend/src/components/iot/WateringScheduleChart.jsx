import {
  alpha,
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function toDurations(events) {
  return events.map((e, i) => {
    const min = Math.max(
      1,
      Math.round((new Date(e.end) - new Date(e.start)) / 60000)
    );
    return { idx: `#${i + 1}`, minutes: min };
  });
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <Box
      sx={(t) => ({
        p: 1,
        px: 1.25,
        borderRadius: 1.25,
        border: `1px solid ${alpha(t.palette.divider, 0.9)}`,
        bgcolor: alpha(t.palette.background.paper, 0.98),
        boxShadow: t.shadows[1],
      })}
    >
      <Typography variant="caption" sx={{ fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block" }}
      >
        Duration:{" "}
        <Box component="span" sx={{ color: "text.primary", fontWeight: 700 }}>
          {payload[0].value}m
        </Box>
      </Typography>
    </Box>
  );
}

export default function WateringScheduleChart({ events = [] }) {
  const theme = useTheme();
  const data = toDurations(events);
  const barColor = theme.palette.info.main;
  const cardBg = `linear-gradient(180deg, ${alpha(
    theme.palette.success.light,
    0.06
  )}, ${alpha(theme.palette.background.paper, 1)})`;

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      elevation={0}
      sx={{
        height: 240,
        borderRadius: 2.5,
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        background: cardBg,
        backdropFilter: "blur(6px)",
      }}
      aria-label="Watering durations per event"
    >
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Watering Durations
            </Typography>
          </Stack>
        }
        sx={{ pb: 0.5 }}
      />
      <CardContent sx={{ pt: 1.25, height: "100%" }}>
        <Box sx={{ height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 6, right: 12, left: -6, bottom: 6 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={alpha(theme.palette.text.secondary, 0.14)}
              />
              <XAxis
                dataKey="idx"
                tick={{
                  fill: alpha(theme.palette.text.secondary, 0.7),
                  fontSize: 12,
                }}
                axisLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
                tickLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
              />
              <YAxis
                unit="m"
                tick={{
                  fill: alpha(theme.palette.text.secondary, 0.7),
                  fontSize: 12,
                }}
                axisLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
                tickLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="minutes"
                name="Minutes"
                fill={barColor}
                radius={[8, 8, 0, 0]}
                maxBarSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
