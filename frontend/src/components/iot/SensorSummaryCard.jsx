import {
  Opacity,
  PowerSettingsNew,
  Science,
  Thermostat,
  WaterDrop,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

// Tiny animated number hook
function useAnimatedNumber(value, duration = 600) {
  const [display, setDisplay] = useState(value);
  const ref = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const from = Number(display) || 0;
    const to = Number(value) || 0;
    cancelAnimationFrame(ref.current);
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * eased);
      if (p < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);
  return display;
}

function StatTile({
  label,
  value,
  unit,
  icon,
  color = "primary",
  decimals = 0,
  text,
}) {
  const theme = useTheme();
  const isText = text !== undefined && text !== null;
  const v = useAnimatedNumber(isText ? 0 : value);
  const c = theme.palette[color]?.main || theme.palette.primary.main;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2.5,
        height: "100%",
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        background: `linear-gradient(180deg, ${alpha(c, 0.08)}, ${alpha(
          theme.palette.background.paper,
          1
        )})`,
        backdropFilter: "blur(4px)",
      }}
    >
      <CardContent sx={{ py: 1.75 }}>
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <Chip
            color={color}
            variant="outlined"
            size="small"
            label={label}
            sx={{
              borderColor: alpha(c, 0.4),
            }}
          />
          <Box
            sx={{
              ml: "auto",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 1.25,
              bgcolor: alpha(c, 0.12),
              color: c,
            }}
          >
            {icon}
          </Box>
        </Stack>
        <Typography variant="h4" sx={{ mt: 1, lineHeight: 1.1 }}>
          {isText
            ? text
            : decimals
            ? Number(v).toFixed(decimals)
            : Math.round(v)}
          {!isText && unit}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function SensorSummaryCards({
  temp,
  humidity,
  rainfall,
  ph,
  n,
  p,
  k,
  pumpOnNow,
}) {
  const theme = useTheme();

  return (
    <Grid container spacing={2.25}>
      {/* Environment */}
      <Grid item xs={6} md={3}>
        <StatTile
          label="Temp"
          value={temp}
          unit="°C"
          icon={<Thermostat fontSize="small" />}
          color="warning"
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <StatTile
          label="Humidity"
          value={humidity}
          unit="%"
          icon={<Opacity fontSize="small" />}
          color="info"
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <StatTile
          label="Rainfall"
          value={rainfall}
          unit=" mm"
          icon={<WaterDrop fontSize="small" />}
          color="primary"
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <StatTile
          label="pH"
          value={ph}
          unit=""
          icon={<Science fontSize="small" />}
          color="success"
          decimals={1}
        />
      </Grid>

      {/* Chemistry */}
      <Grid item xs={12} md={4}>
        <StatTile
          label="Nitrogen (N)"
          value={n}
          unit=" mg/kg"
          icon={<Science fontSize="small" />}
          color="secondary"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatTile
          label="Phosphorus (P)"
          value={p}
          unit=" mg/kg"
          icon={<Science fontSize="small" />}
          color="secondary"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatTile
          label="Potassium (K)"
          value={k}
          unit=" mg/kg"
          icon={<Science fontSize="small" />}
          color="secondary"
        />
      </Grid>

      {/* Pump status */}
      <Grid item xs={6} md={3}>
        <StatTile
          label="Pump"
          text={pumpOnNow ? "ON" : "OFF"}
          icon={<PowerSettingsNew fontSize="small" />}
          color={pumpOnNow ? "success" : "secondary"}
        />
      </Grid>
    </Grid>
  );
}
