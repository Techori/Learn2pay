import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Services from "./pages/services";
import Contact from "./pages/contact";
import About from "./pages/about";
import Demo from "./pages/demo";
import Pricing from "./pages/Pricing";

import ParentDashboard from "./pages/dashboards/parent";
import ReferralDashboard from "./pages/dashboards/referral";
import InstituteDashboard from "./pages/dashboards/Institute";
import SupportDashboard from "./pages/dashboards/support";
import SalesDashboard from "./pages/dashboards/sales";

import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "./components/ui/Toaster";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/demo" element={<Demo />} />

          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/referral-dashboard" element={<ReferralDashboard />} />
          <Route path="/institute-dashboard" element={<InstituteDashboard />} />
          <Route path="/support-dashboard" element={<SupportDashboard />} />
          <Route path="/sales-dashboard" element={<SalesDashboard />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
