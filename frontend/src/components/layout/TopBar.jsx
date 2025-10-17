// import {
//   Home as HomeIcon,
//   Language as LanguageIcon,
//   Login as LoginIcon,
//   Logout as LogoutIcon,
//   Memory as MemoryIcon,
//   MenuBook as MenuBookIcon,
//   Notifications as NotificationsIcon,
//   Person as PersonIcon,
//   Science as ScienceIcon,
//   ShoppingBag as ShoppingBagIcon,
//   AccountBalanceWallet as WalletIcon,
//   Info as InfoIcon, 
// } from "@mui/icons-material";
// import {
//   AppBar,
//   Badge,
//   Box,
//   Button,
//   Divider,
//   IconButton,
//   Toolbar,
//   Tooltip,
//   alpha,
//   useTheme,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import { useAuth } from "../../context/AuthContext";

// // Navigation config
// const navActions = [
//   { to: "/dashboard", label: "Dashboard", icon: <HomeIcon /> },
//   { to: "/crop-prediction", label: "Crop Prediction", icon: <ScienceIcon /> },
//   { to: "/marketplace", label: "Marketplace", icon: <ShoppingBagIcon /> },
//   { to: "/iot-quality", label: "IoT Quality", icon: <MemoryIcon /> },
//   { to: "/payments", label: "Payments", icon: <WalletIcon /> },
//   { to: "/learning-hub", label: "Learning Hub", icon: <MenuBookIcon /> },
//   { to: "/About", label: "About Us", icon: <InfoIcon /> },
// ];

// const auxActions = [
//   { to: "/language", label: "Language", icon: <LanguageIcon /> },
//   { to: "/notifications", label: "Notifications", icon: <NotificationsIcon /> },
//   { to: "/profile", label: "Profile", icon: <PersonIcon /> },
   
// ];

// // Motion (modern create API)
// const MotionBox = motion.create(Box);
// const MotionIconButton = motion.create(IconButton);

// export default function TopBar({ appTitle = "Smart AgroConnect", notifCount = 2 }) {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout } = useAuth();

//   const isActive = (path) => location.pathname.startsWith(path);
//   const leftActions = navActions.slice(0, 4);
//   const rightActions = navActions.slice(4);

//   const hoverScale = { whileHover: { scale: 1.06 }, whileTap: { scale: 0.98 } };

//   // Emerald gradient colors
//   const emeraldStart = "#064e3b";
//   const emeraldMid = "#065f46";
//   const emeraldEnd = "#047857";

//   return (
//     <AppBar
//       position="fixed"
//       elevation={0}
//       sx={{
//         zIndex: (t) => t.zIndex.drawer + 1,
//         borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
//         background: `linear-gradient(180deg, ${alpha(emeraldStart, 0.92)} 0%, ${alpha(
//           emeraldMid,
//           0.9
//         )} 55%, ${alpha(emeraldEnd, 0.88)} 100%)`,
//         backdropFilter: "blur(8px)",
//         color: "common.white",
//       }}
//     >
//       {/* Glossy highlight band */}
//       <MotionBox
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.6 }}
//         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         sx={{
//           position: "absolute",
//           inset: 0,
//           pointerEvents: "none",
//           background:
//             "linear-gradient(0deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.0) 60%)",
//         }}
//       />

//       <Toolbar sx={{ gap: 1.25, position: "relative" }}>
//         {/* Brand */}
//         <MotionBox
//           {...hoverScale}
//           onClick={() => navigate("/")}
//           sx={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: 1,
//             mr: 1,
//             textDecoration: "none",
//             cursor: "pointer",
//           }}
//           aria-label="Go to Home"
//         >
//           <Box
//             component="img"
//             src={logo}
//             alt="Smart AgroConnect Logo"
//             sx={{
//               height: 34,
//               width: "auto",
//               display: "block",
//               filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.25))",
//             }}
//           />
//           <Box
//             component="span"
//             sx={{
//               fontWeight: 800,
//               letterSpacing: 0.2,
//               color: "common.white",
//               display: { xs: "none", sm: "inline" },
//               textTransform: "none",
//               textShadow: "0 1px 8px rgba(0,0,0,0.25)",
//             }}
//           >
//             {appTitle}
//           </Box>
//         </MotionBox>

//         {/* Left nav icons */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//           {leftActions.map((a) => {
//             const active = isActive(a.to);
//             return (
//               <Tooltip key={a.to} title={a.label} arrow>
//                 <MotionIconButton
//                   {...hoverScale}
//                   component={Link}
//                   to={a.to}
//                   aria-label={a.label}
//                   size="small"
//                   sx={{
//                     borderRadius: 2,
//                     transition: "all .2s ease",
//                     color: "common.white",
//                     border: active
//                       ? `1px solid ${alpha("#fff", 0.35)}`
//                       : "1px solid transparent",
//                     bgcolor: active ? alpha("#ffffff", 0.08) : "transparent",
//                     "&:hover": { bgcolor: alpha("#ffffff", 0.12) },
//                   }}
//                 >
//                   {a.icon}
//                 </MotionIconButton>
//               </Tooltip>
//             );
//           })}
//         </Box>

//         {/* Spacer */}
//         <Box sx={{ flexGrow: 1 }} />

//         {/* Right nav icons */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//           {rightActions.map((a) => {
//             const active = isActive(a.to);
//             return (
//               <Tooltip key={a.to} title={a.label} arrow>
//                 <MotionIconButton
//                   {...hoverScale}
//                   component={Link}
//                   to={a.to}
//                   aria-label={a.label}
//                   size="small"
//                   sx={{
//                     borderRadius: 2,
//                     transition: "all .2s ease",
//                     color: "common.white",
//                     border: active
//                       ? `1px solid ${alpha("#fff", 0.35)}`
//                       : "1px solid transparent",
//                     bgcolor: active ? alpha("#ffffff", 0.08) : "transparent",
//                     "&:hover": { bgcolor: alpha("#ffffff", 0.12) },
//                   }}
//                 >
//                   {a.icon}
//                 </MotionIconButton>
//               </Tooltip>
//             );
//           })}

//           <Divider
//             orientation="vertical"
//             flexItem
//             sx={{ mx: 0.75, borderColor: alpha("#fff", 0.14) }}
//           />

//           {/* Aux actions including About Us */}
//           {auxActions.map((a) => {
//             const active = isActive(a.to);
//             return (
//               <Tooltip key={a.to} title={a.label} arrow>
//                 <MotionIconButton
//                   {...hoverScale}
//                   component={Link}
//                   to={a.to}
//                   aria-label={a.label}
//                   size="small"
//                   sx={{
//                     color: "common.white",
//                     "&:hover": { bgcolor: alpha("#ffffff", 0.12) },
//                   }}
//                 >
//                   {a.icon}
//                 </MotionIconButton>
//               </Tooltip>
//             );
//           })}

//           {/* Auth CTA */}
//           <Divider
//             orientation="vertical"
//             flexItem
//             sx={{ mx: 0.75, borderColor: alpha("#fff", 0.14) }}
//           />

//           {user ? (
//             <Button
//               onClick={async () => {
//                 try {
//                   await logout?.();
//                   navigate("/");
//                 } catch {}
//               }}
//               size="small"
//               startIcon={<LogoutIcon />}
//               sx={{
//                 textTransform: "none",
//                 fontWeight: 700,
//                 borderRadius: 2,
//                 px: 1.25,
//                 color: "common.white",
//                 border: `1px solid ${alpha("#fff", 0.28)}`,
//                 bgcolor: alpha("#ffffff", 0.06),
//                 "&:hover": { borderColor: alpha("#fff", 0.45), bgcolor: alpha("#ffffff", 0.12) },
//               }}
//             >
//               Logout
//             </Button>
//           ) : (
//             <Button
//               onClick={() => navigate("/login")}
//               size="small"
//               startIcon={<LoginIcon />}
//               sx={{
//                 textTransform: "none",
//                 fontWeight: 700,
//                 borderRadius: 2,
//                 px: 1.25,
//                 color: "common.white",
//                 border: `1px solid ${alpha("#fff", 0.28)}`,
//                 bgcolor: alpha("#ffffff", 0.06),
//                 "&:hover": { borderColor: alpha("#fff", 0.45), bgcolor: alpha("#ffffff", 0.12) },
//               }}
//             >
//               Login
//             </Button>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

import {
  Home as HomeIcon,
  Language as LanguageIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Memory as MemoryIcon,
  MenuBook as MenuBookIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Science as ScienceIcon,
  ShoppingBag as ShoppingBagIcon,
  AccountBalanceWallet as WalletIcon,
  Info as InfoIcon,
  ShoppingCart as ShoppingCartIcon, // <-- Added
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Tooltip,
  alpha,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext"; // <-- Added

// Navigation config
const navActions = [
  { to: "/dashboard", label: "Dashboard", icon: <HomeIcon /> },
  { to: "/crop-prediction", label: "Crop Prediction", icon: <ScienceIcon /> },
  { to: "/marketplace", label: "Marketplace", icon: <ShoppingBagIcon /> },
  { to: "/iot-quality", label: "IoT Quality", icon: <MemoryIcon /> },
  { to: "/payments", label: "Payments", icon: <WalletIcon /> },
  { to: "/learning-hub", label: "Learning Hub", icon: <MenuBookIcon /> },
  { to: "/About", label: "About Us", icon: <InfoIcon /> },
];

const auxActions = [
  { to: "/language", label: "Language", icon: <LanguageIcon /> },
  { to: "/notifications", label: "Notifications", icon: <NotificationsIcon /> },
  { to: "/profile", label: "Profile", icon: <PersonIcon /> },
];

const MotionBox = motion.create(Box);
const MotionIconButton = motion.create(IconButton);

export default function TopBar({ appTitle = "Smart AgroConnect" }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { totalItems } = useCart(); // <-- Added

  const isActive = (path) => location.pathname.startsWith(path);
  const leftActions = navActions.slice(0, 4);
  const rightActions = navActions.slice(4);
  const hoverScale = { whileHover: { scale: 1.06 }, whileTap: { scale: 0.98 } };

  const emeraldStart = "#064e3b";
  const emeraldMid = "#065f46";
  const emeraldEnd = "#047857";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (t) => t.zIndex.drawer + 1,
        borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
        background: `linear-gradient(180deg, ${alpha(emeraldStart, 0.92)} 0%, ${alpha(
          emeraldMid,
          0.9
        )} 55%, ${alpha(emeraldEnd, 0.88)} 100%)`,
        backdropFilter: "blur(8px)",
        color: "common.white",
      }}
    >
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(0deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.0) 60%)",
        }}
      />

      <Toolbar sx={{ gap: 1.25, position: "relative" }}>
        {/* Brand */}
        <MotionBox
          {...hoverScale}
          onClick={() => navigate("/")}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            mr: 1,
            textDecoration: "none",
            cursor: "pointer",
          }}
          aria-label="Go to Home"
        >
          <Box
            component="img"
            src={logo}
            alt="Smart AgroConnect Logo"
            sx={{
              height: 34,
              width: "auto",
              display: "block",
              filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.25))",
            }}
          />
          <Box
            component="span"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.2,
              color: "common.white",
              display: { xs: "none", sm: "inline" },
              textTransform: "none",
              textShadow: "0 1px 8px rgba(0,0,0,0.25)",
            }}
          >
            {appTitle}
          </Box>
        </MotionBox>

        {/* Left nav icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {leftActions.map((a) => {
            const active = isActive(a.to);
            return (
              <Tooltip key={a.to} title={a.label} arrow>
                <MotionIconButton
                  {...hoverScale}
                  component={Link}
                  to={a.to}
                  aria-label={a.label}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    transition: "all .2s ease",
                    color: "common.white",
                    border: active ? `1px solid ${alpha("#fff", 0.35)}` : "1px solid transparent",
                    bgcolor: active ? alpha("#ffffff", 0.08) : "transparent",
                    "&:hover": { bgcolor: alpha("#ffffff", 0.12) },
                  }}
                >
                  {a.icon}
                </MotionIconButton>
              </Tooltip>
            );
          })}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right nav icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {rightActions.map((a) => {
            const active = isActive(a.to);
            return (
              <Tooltip key={a.to} title={a.label} arrow>
                <MotionIconButton
                  {...hoverScale}
                  component={Link}
                  to={a.to}
                  aria-label={a.label}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    transition: "all .2s ease",
                    color: "common.white",
                    border: active ? `1px solid ${alpha("#fff", 0.35)}` : "1px solid transparent",
                    bgcolor: active ? alpha("#ffffff", 0.08) : "transparent",
                    "&:hover": { bgcolor: alpha("#ffffff", 0.12) },
                  }}
                >
                  {a.icon}
                </MotionIconButton>
              </Tooltip>
            );
          })}

          <Divider orientation="vertical" flexItem sx={{ mx: 0.75, borderColor: alpha("#fff", 0.14) }} />

          {/* Aux actions */}
          {auxActions.map((a) => {
            const active = isActive(a.to);
            return (
              <Tooltip key={a.to} title={a.label} arrow>
                <MotionIconButton
                  {...hoverScale}
                  component={Link}
                  to={a.to}
                  aria-label={a.label}
                  size="small"
                  sx={{ color: "common.white", "&:hover": { bgcolor: alpha("#ffffff", 0.12) } }}
                >
                  {a.icon}
                </MotionIconButton>
              </Tooltip>
            );
          })}

          {/* Cart Icon */}
          <Divider orientation="vertical" flexItem sx={{ mx: 0.75, borderColor: alpha("#fff", 0.14) }} />
          <Tooltip title="Cart" arrow>
            <MotionIconButton
              {...hoverScale}
              component={Link}
              to="/cart"
              aria-label="Cart"
              size="small"
              sx={{ color: "common.white", "&:hover": { bgcolor: alpha("#ffffff", 0.12) } }}
            >
              <Badge badgeContent={totalItems} color="error" overlap="circular">
                <ShoppingCartIcon />
              </Badge>
            </MotionIconButton>
          </Tooltip>

          {/* Auth Buttons */}
          <Divider orientation="vertical" flexItem sx={{ mx: 0.75, borderColor: alpha("#fff", 0.14) }} />
          {user ? (
            <Button
              onClick={async () => {
                try { await logout?.(); navigate("/"); } catch {}
              }}
              size="small"
              startIcon={<LogoutIcon />}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 2,
                px: 1.25,
                color: "common.white",
                border: `1px solid ${alpha("#fff", 0.28)}`,
                bgcolor: alpha("#ffffff", 0.06),
                "&:hover": { borderColor: alpha("#fff", 0.45), bgcolor: alpha("#ffffff", 0.12) },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              size="small"
              startIcon={<LoginIcon />}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 2,
                px: 1.25,
                color: "common.white",
                border: `1px solid ${alpha("#fff", 0.28)}`,
                bgcolor: alpha("#ffffff", 0.06),
                "&:hover": { borderColor: alpha("#fff", 0.45), bgcolor: alpha("#ffffff", 0.12) },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
