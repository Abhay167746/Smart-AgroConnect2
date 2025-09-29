import { AccountBalanceWallet } from "@mui/icons-material";
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

export default function WalletPreviewCard({ balance, transactions, link }) {
  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <AccountBalanceWallet />
            <Typography variant="subtitle2" color="text.secondary">
              Wallet
            </Typography>
          </Stack>
          <Chip
            color="success"
            variant="outlined"
            size="small"
            label={`₹${balance.toLocaleString()}`}
          />
        </Stack>
        <List dense sx={{ pt: 1 }}>
          {transactions.map((t) => (
            <ListItem key={t.id} disableGutters sx={{ py: 0.5 }}>
              <ListItemText primary={t.text} secondary={t.time} />
            </ListItem>
          ))}
        </List>
        <Button
          component={RouterLink}
          to={link}
          size="small"
          variant="contained"
          color="success"
        >
          Go to Payments
        </Button>
      </CardContent>
    </Card>
  );
}
