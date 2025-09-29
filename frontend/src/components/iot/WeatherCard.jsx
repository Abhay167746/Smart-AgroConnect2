import { Grain, Thunderstorm, WaterDrop, WbSunny } from "@mui/icons-material";
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

export default function WeatherCard({
  location,
  tempC,
  humidity,
  windKph,
  precipMm,
  condition,
}) {
  const theme = useTheme();
  const cWarn = theme.palette.warning.main;
  const rainy = (condition || "").toLowerCase().includes("rain");
  const iconEl = rainy ? (
    <Thunderstorm fontSize="large" />
  ) : (
    <WbSunny fontSize="large" />
  );

  const cardBg = `linear-gradient(180deg, ${alpha(
    theme.palette.success.light,
    0.06
  )}, ${alpha(theme.palette.background.paper, 1)})`;

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 2.5,
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        background: cardBg,
        backdropFilter: "blur(6px)",
      }}
      aria-label={`Weather in ${location}`}
    >
      <CardHeader
        title={
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle2" color="text.secondary">
              Weather
            </Typography>
            <Chip
              size="small"
              label={condition}
              color="primary"
              variant="outlined"
            />
          </Stack>
        }
        sx={{ pb: 0.5 }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ mt: 0.5 }}>
          {location}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
          <Box sx={{ color: rainy ? theme.palette.info.main : cWarn }}>
            {iconEl}
          </Box>
          <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1 }}>
            {Math.round(tempC)}°C
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 2, flexWrap: "wrap", rowGap: 1 }}
        >
          <Chip
            icon={<WaterDrop />}
            label={`Hum ${humidity}%`}
            size="small"
            variant="outlined"
            sx={{
              borderColor: alpha(theme.palette.info.main, 0.35),
              bgcolor: alpha(theme.palette.info.main, 0.08),
            }}
          />
          <Chip
            icon={<Grain />}
            label={`Wind ${windKph} kph`}
            size="small"
            variant="outlined"
            sx={{
              borderColor: alpha(theme.palette.secondary.main, 0.35),
              bgcolor: alpha(theme.palette.secondary.main, 0.08),
            }}
          />
          <Chip
            icon={<Thunderstorm />}
            label={`Rain ${precipMm} mm`}
            size="small"
            variant="outlined"
            sx={{
              borderColor: alpha(theme.palette.primary.main, 0.35),
              bgcolor: alpha(theme.palette.primary.main, 0.08),
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
