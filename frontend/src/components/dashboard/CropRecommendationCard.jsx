import { Agriculture } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function CropRecommendationCard({ recommended, alternatives }) {
  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2" color="text.secondary">
            Crop Recommendation
          </Typography>
          <Chip icon={<Agriculture />} label="From ML model" size="small" />
        </Stack>
        <Typography variant="h5" sx={{ mt: 1 }}>
          {recommended.crop}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reason: {recommended.reason}
        </Typography>

        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          Top alternatives
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap">
          {alternatives.map((alt) => (
            <Stack key={alt.crop} sx={{ minWidth: 160 }}>
              <Typography variant="body2">{alt.crop}</Typography>
              <LinearProgress
                variant="determinate"
                value={Math.round(alt.score * 100)}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Stack>
          ))}
        </Stack>

        <Button
          component={RouterLink}
          to="/crop-prediction"
          size="small"
          sx={{ mt: 2 }}
          variant="contained"
          color="success"
        >
          View details
        </Button>
      </CardContent>
    </Card>
  );
}
