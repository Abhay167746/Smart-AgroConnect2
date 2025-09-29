import { Science, Thunderstorm, WbSunny } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

export default function WeatherSoilCard({ location, weather, soil }) {
  const icon = weather?.condition?.toLowerCase().includes("rain") ? (
    <Thunderstorm />
  ) : (
    <WbSunny />
  );
  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          Weather & Soil
        </Typography>
        <Typography variant="h6" sx={{ mt: 0.5 }}>
          {location}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
          <Box sx={{ color: "warning.main" }}>{icon}</Box>
          <Typography variant="h3" fontWeight={600}>
            {Math.round(weather.tempC)}°C
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip size="small" label={`Hum ${weather.humidity}%`} />
            <Chip size="small" label={`Wind ${weather.windKph} kph`} />
            <Chip size="small" label={`Rain ${weather.precipMm} mm`} />
          </Stack>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" color="text.secondary">
          Soil snapshot
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} alignItems="center">
          <Chip
            icon={<Science />}
            label={`pH ${soil.ph}`}
            size="small"
            color="success"
            variant="outlined"
          />
          <Chip
            icon={<Science />}
            label={`N ${soil.n} mg/kg`}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<Science />}
            label={`P ${soil.p} mg/kg`}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<Science />}
            label={`K ${soil.k} mg/kg`}
            size="small"
            variant="outlined"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
