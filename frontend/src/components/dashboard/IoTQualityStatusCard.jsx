import {
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function IoTQualityStatusCard({ current, lastBatch, link }) {
  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2" color="text.secondary">
            IoT Quality
          </Typography>
          <Chip
            size="small"
            label={current.status === "PASS" ? "Verified" : "Check"}
            color={current.status === "PASS" ? "success" : "warning"}
          />
        </Stack>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Methane: {current.methanePPM} ppm
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last batch: {lastBatch.status} •{" "}
          {lastBatch.released ? "Payment released" : "On hold"}
        </Typography>
        <Button
          component={RouterLink}
          to={link}
          size="small"
          sx={{ mt: 2 }}
          variant="outlined"
        >
          Open IoT dashboard
        </Button>
      </CardContent>
    </Card>
  );
}
