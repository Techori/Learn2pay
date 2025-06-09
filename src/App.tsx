import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Institute from "./pages/dashboards/instiute";
import Parent from "./pages/dashboards/parent";
import ReferralDashboard from "./pages/dashboards/ReferralDashboard";
import SupportDashboard from "./pages/dashboards/SupportDashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/institute" element={<Institute />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="/referral" element={<ReferralDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/support" element={<SupportDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
