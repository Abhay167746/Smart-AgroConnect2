import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/layout/Footer";
import TopBar from "./components/layout/Topbar";
import { AuthProvider } from "./context/AuthContext";
// Pages
import { Outlet } from "react-router-dom";
import CropPrediction from "./pages/CropPrediction";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LearningHub from "./pages/LearningHub";
import ListProduce from "./pages/ListProduce";
import Login from "./pages/Login";
import Marketplace from "./pages/Marketplace";
import Signup from "./pages/Signup";
import IoTQualityDashboard from "./pages/IoTQualityDashboard";
import AboutUs from "./pages/AboutUs";
// Simple 404 Page
function NotFound() {
  return (
    <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
      404 - Page Not Found
    </h2>
  );
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-emerald-50">
      <TopBar />
      <main className="flex-1 pt-[64px] min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* All routes share AppLayout */}
          <Route element={<AppLayout />}>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/list" element={<ListProduce />} />
              <Route path="/crop-prediction" element={<CropPrediction />} />
              <Route path="/learning-hub" element={<LearningHub />} />
              <Route path="/iot-quality" element= {<IoTQualityDashboard />} />
              <Route path="/About" element={<AboutUs/>}/>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
