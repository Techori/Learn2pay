import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

import ParentDashboard from "./pages/dashboards/parent";
import ReferralDashboard from "./pages/dashboards/referral";

import InstituteDashboard from "./pages/dashboards/institute";

import SupportDashboard from "./pages/dashboards/support";


import Login from "./pages/login";
import Register from "./pages/register";
import Services from "./pages/services";
import Contact from "./pages/contact";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/about";

import Demo from "./pages/demo";
import Pricing from "./pages/Pricing";

function App() {
  return (
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;