import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReferralDashboard from "./pages/referral";

import SupportDashboard from "./pages/support";
import SalesDashboard from "./pages/sales";

import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "./components/ui/Toaster";
import SuperAdminDashboard from "./pages/superAdmin";
import Home from "./pages/home";
function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/superAdmin-dashboard"
            element={<SuperAdminDashboard />}
          />
          <Route path="/referral-dashboard" element={<ReferralDashboard />} />

          <Route path="/support-dashboard" element={<SupportDashboard />} />
          <Route path="/sales-dashboard" element={<SalesDashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
