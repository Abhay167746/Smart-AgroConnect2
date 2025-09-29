import { WbSunny } from "@mui/icons-material";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function WelcomeHeader({ farmer }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Stack>
          <Typography variant="h5">Welcome, {farmer.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {farmer.location}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            icon={<WbSunny />}
            label="Favorable day for irrigation"
            color="success"
            variant="outlined"
          />
          <Button
            component={RouterLink}
            to="/crop-prediction"
            variant="contained"
            color="success"
          >
            Crop Prediction
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
