import {
  alpha,
  Card,
  CardContent,
  Chip,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";

export default function LegendToolbar({
  range = "24h",
  onRangeChange,
  autoRefresh = false,
  onToggleRefresh,
  showLegend = true,
  legend = [
    { label: "Temp (°C)", color: "#ff9800" },
    { label: "Humidity (%)", color: "#26c6da" },
    { label: "pH", color: "#66bb6a" },
    { label: "Rainfall (mm)", color: "#90caf9" },
  ],
}) {
  const theme = useTheme();
  const cardBg = `linear-gradient(180deg, ${alpha(
    theme.palette.success.light,
    0.06
  )}, ${alpha(theme.palette.background.paper, 1)})`;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2.5,
        background: cardBg,
        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
        backdropFilter: "blur(6px)",
      }}
    >
      <CardContent sx={{ py: 1.25 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          {/* Left: Time range group */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Time Range
            </Typography>
            <ToggleButtonGroup
              size="small"
              value={range}
              exclusive
              onChange={(_, v) => v && onRangeChange?.(v)}
              color="primary"
            >
              <ToggleButton value="6h">6h</ToggleButton>
              <ToggleButton value="24h">24h</ToggleButton>
              <ToggleButton value="7d">7d</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {/* Center: Optional inline legend */}
          {showLegend && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                flexWrap: "wrap",
                rowGap: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {legend.map((l) => (
                <Chip
                  key={l.label}
                  size="small"
                  label={l.label}
                  variant="outlined"
                  sx={{
                    borderColor: alpha(l.color, 0.35),
                    bgcolor: alpha(l.color, 0.08),
                    color: l.color,
                  }}
                />
              ))}
            </Stack>
          )}

          {/* Right: Auto refresh */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Auto refresh
            </Typography>
            <Switch
              checked={autoRefresh}
              onChange={(e) => onToggleRefresh?.(e.target.checked)}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
