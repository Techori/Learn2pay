import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReferralDashboard from "./pages/referral";
import SupportDashboard from "./pages/support";
import SalesDashboard from "./pages/sales";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "./components/ui/Toaster";
import SuperAdminDashboard from "./pages/superAdmin";
import Home from "./pages/home";
import Login from "./pages/Login";

import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/superAdmin-dashboard" element={<SuperAdminDashboard />}/>
          <Route path="/referral-dashboard" element={<ReferralDashboard />} />
          <Route path="/support-dashboard" element={<SupportDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sales-dashboard/salesperson" element={<SalesDashboard />} />
          <Route path="/sales-dashbaord/manager" element={<SalesDashboard />} />
          <Route path="/support-team-dashboard" element={<SupportDashboard role="member" />} />
          <Route path="/sales-dashboard" element={<SalesDashboard />} />
          
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
