import {
  Button,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const colorFor = (status) => {
  if (/approved/i.test(status)) return "success";
  if (/pending|quality/i.test(status)) return "warning";
  if (/payment/i.test(status)) return "info";
  return "default";
};

export default function ActiveListingsCard({ items }) {
  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2" color="text.secondary">
            Active Produce Listings
          </Typography>
          <Button component={RouterLink} to="/marketplace" size="small">
            View all
          </Button>
        </Stack>
        <List dense>
          {items.map((it) => (
            <ListItem key={it.id} disableGutters sx={{ py: 0.5 }}>
              <ListItemText
                primary={`${it.crop} • ${it.qtyKg} kg • ${it.buyer}`}
                secondary={it.id}
              />
              <Chip
                size="small"
                label={it.status}
                color={colorFor(it.status)}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
