import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Parent from "./pages/dashboards/parent";
import Referral from "./pages/dashboards/referral";
import Login from "./pages/login";
import Register from "./pages/register";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/about";
import Institute from "./pages/dashboards/Institute";
import Pricing from "./pages/pricing";
import Services from "./pages/services";
import Contact from "./pages/contact";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/institute" element={<Institute />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/parent-dashboard" element={<Parent />} />
        <Route path="/referral-dashboard" element={<Referral />} />
        <Route path="/institute-dashboard" element={<Institute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
