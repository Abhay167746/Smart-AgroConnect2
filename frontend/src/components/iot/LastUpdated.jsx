import { Chip } from "@mui/material";

export default function LastUpdated({ timestamp }) {
  const d = new Date(timestamp);
  const label = `Updated ${d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  return <Chip size="small" variant="outlined" label={label} />;
}
