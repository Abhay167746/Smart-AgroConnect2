import { Card, CardContent, CardHeader, Chip, Stack, Typography, useTheme, alpha, Box } from "@mui/material";
import { Bar, ComposedChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { motion } from "framer-motion";

function toBands(events) {
  return events.map((e, idx) => ({
    id: idx,
    start: new Date(e.start),
    end: new Date(e.end),
  }));
}
function hoursLabel(d) {
  return d.getHours().toString().padStart(2, "0") + ":00";
}
function xTicks() {
  const now = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const t = new Date(now.getTime() - (6 - i) * 4 * 3600 * 1000);
    return t;
  });
}

function CustomTooltip({ active, label }) {
  if (!active || !label) return null;
  const h = hoursLabel(new Date(label));
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
        {h}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
        Pump interval
      </Typography>
    </Box>
  );
}

export default function PumpActivityChart({ events = [], pumpOnNow = false }) {
  const theme = useTheme();
  const bands = toBands(events);
  const ticks = xTicks();
  const data = ticks.map((t) => ({ t })); // anchor series

  const cOn = theme.palette.success.main;
  const fillBand = alpha(cOn, 0.25);
  const strokeBand = alpha(cOn, 0.8);

  const cardBg = `linear-gradient(180deg, ${alpha(theme.palette.success.light, 0.06)}, ${alpha(
    theme.palette.background.paper,
    1
  )})`;

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
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
      aria-label="Water pump activity over the last 24 hours"
    >
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Pump Activity (24h)
            </Typography>
            <Chip
              size="small"
              label={pumpOnNow ? "ON" : "OFF"}
              color={pumpOnNow ? "success" : "default"}
              variant={pumpOnNow ? "filled" : "outlined"}
            />
          </Stack>
        }
        sx={{ pb: 0.5 }}
      />
      <CardContent sx={{ pt: 1.25, height: "100%" }}>
        {/* Legend row (inline) */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 8,
              borderRadius: 999,
              bgcolor: fillBand,
              border: `1px solid ${strokeBand}`,
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Pump ON intervals
          </Typography>
        </Stack>

        <Box sx={{ height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 6, right: 12, left: 0, bottom: 6 }}>
              <XAxis
                dataKey="t"
                type="number"
                domain={["dataMin", "dataMax"]}
                scale="time"
                tickFormatter={(v) => hoursLabel(new Date(v))}
                ticks={ticks.map((t) => t.getTime())}
                tick={{ fill: alpha(theme.palette.text.secondary, 0.7), fontSize: 12 }}
                axisLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
                tickLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
                minTickGap={24}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* ON bands */}
              {bands.map((b) => (
                <ReferenceArea
                  key={b.id}
                  x1={b.start.getTime()}
                  x2={b.end.getTime()}
                  y1={0}
                  y2={1}
                  ifOverflow="extendDomain"
                  fill={fillBand}
                  stroke={strokeBand}
                  strokeOpacity={0.9}
                  fillOpacity={1}
                />
              ))}

              {/* Invisible bar to anchor composed chart */}
              <Bar dataKey="__anchor" fill="transparent" />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
