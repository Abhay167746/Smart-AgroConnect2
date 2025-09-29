import {
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

export default function MarketPricesCard({ region, series }) {
  const spark = (values, color) => (
    <ResponsiveContainer width={90} height={28}>
      <AreaChart data={values.map((v, i) => ({ i, v }))}>
        <defs>
          <linearGradient id={`g-${color}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.8} />
            <stop offset="100%" stopColor={color} stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <Area
          isAnimationActive={false}
          type="monotone"
          dataKey="v"
          stroke={color}
          fill={`url(#g-${color})`}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle2" color="text.secondary">
            Market Prices
          </Typography>
          <Chip size="small" label={region} />
        </Stack>
        <List dense sx={{ pt: 1 }}>
          {series.map((s) => (
            <ListItem
              key={s.name}
              secondaryAction={<div>{spark(s.trend, "#42a5f5")}</div>}
            >
              <ListItemText
                primary={`${s.name} — ₹${s.price.toFixed(1)}/kg`}
                secondary="Last 5 days"
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
